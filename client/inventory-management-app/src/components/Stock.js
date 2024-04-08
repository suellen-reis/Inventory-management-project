import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Table, Alert, Button } from "react-bootstrap";
import Edit from "./Edit";
import Delete from "./Delete";

const Stock = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.name : null;
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stockData, setStockData] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDel, setIsVisibleDel] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState({});

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const handleVisibleDel = () => {
    setIsVisibleDel((prev) => !prev);
  };

  const handleError = async (response, setErrors) => {
    const errorData = await response.json();
    if (errorData.errors) {
      setErrors(errorData.errors.map((err) => err.msg));
      console.log(errorData.errors);
    } else {
      throw new Error(
        errorData.msg || "An error occurred while fetching Stock Data"
      );
    }
  };

  //Delete
  const handleDelete = async () => {
    console.log("Delete frontend");
    if (token) {
      try {
        const deleteResp = await fetch(
          `${process.env.REACT_APP_HOST}/product/delete`,
          {
            method: "DELETE",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: selectedProduct._id }),
          }
        );
        if (!deleteResp.ok) {
          await handleError(deleteResp, setErrors);
          return;
        }
        const data = await deleteResp.json();
        handleVisibleDel();
        alert(data.message);
      } catch (error) {
        console.error("Error while fetching delete", error);
      }
    }
  };

  // Check if there is a Token
  useEffect(() => {
    if (!token) {
      window.location.href = "/user/login";
    }
  }, [token]);

  // Fetch data from a GET request
  useEffect(() => {
    const fetchStock = async () => {
      if (token) {
        console.log("Fetch Stock");
        try {
          const response = await fetch(
            `${process.env.REACT_APP_HOST}/product/stock`,
            {
              method: "GET",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            await handleError(response, setErrors);
            return;
          }
          const data = await response.json();
          setStockData(data);
          console.log("Stock was loaded.");
        } catch (error) {
          console.error("Error while fetching product", error);
        }
      }
    };
    fetchStock();
  }, [token, isVisibleDel, isVisible]);

  return (
    <div className="mainDiv">
      <h2>Stock</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {errors.length > 0 && (
        <div
          style={{
            width: "50%",
            padding: 5,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {errors.map((err, index) => (
            <Alert key={index} variant="danger">
              {err}
            </Alert>
          ))}
        </div>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((product, index) => (
            <tr key={index}>
              <td>{product.code}</td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.total}</td>
              <td className="text-center">
                <Button
                  className="me-2 ms-2"
                  type="button"
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(product);
                    handleVisible();
                  }}
                >
                  <i className="m-2 bi bi-pen"></i>
                  Edit
                </Button>

                <Button
                  className="me-2 ms-2"
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct(product);
                    handleVisibleDel();
                  }}
                >
                  <i className="m-2 bi bi-trash"></i>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Edit
        isVisible={isVisible}
        handleVisible={handleVisible}
        product={selectedProduct}
        setProduct={setSelectedProduct}
      ></Edit>
      <Delete
        isVisible={isVisibleDel}
        handleVisible={handleVisibleDel}
        product={selectedProduct}
        onDelete={handleDelete}
      ></Delete>
    </div>
  );
};

export default Stock;
