import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Table, Alert, Button, ButtonGroup } from "react-bootstrap";
import Edit from "./Edit";

const Stock = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.name : null;
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
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
            const errorData = await response.json();
            if (errorData.errors) {
              setErrors(errorData.errors.map((err) => err.msg));
              console.log(errorData.errors);
            } else {
              throw new Error(
                errorData.msg || "An error occurred while fetching Stock Data"
              );
            }
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
  }, [token]);

  return (
    <div className="mainDiv">
      <h2>Stock</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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
                  onClick={handleVisible}
                >
                  <i className="m-2 bi bi-pen"></i>
                  Edit
                </Button>

                <Button
                  className="me-2 ms-2"
                  type="button"
                  variant="danger"
                  size="sm"
                >
                  <i className="m-2 bi bi-trash"></i>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Edit isVisible={isVisible} handleVisible={handleVisible}></Edit>
    </div>
  );
};

export default Stock;
