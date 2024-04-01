import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Table, Alert } from "react-bootstrap";

const Stock = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.name : null;
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [stockData, setStockData] = useState([]);

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
            "https://inventory-management-project-server-peach.vercel.app/product/stock" ||
              `http://localhost:8000/product/stock`,
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Stock;
