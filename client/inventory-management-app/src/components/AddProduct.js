import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState({
    productName: "",
    code: "",
    description: "",
    quantity: 0,
    price: 0,
    userId: userId,
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setProductData((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  //Check if there is a Token

  useEffect(() => {
    if (!token) {
      window.location.href = "/user/login";
    }
  }, [token]);

  // Fetch data from a POST request
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    console.log(userId);

    try {
      const response = await fetch("http://localhost:8000/product/add", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err) => err.msg));
          console.log(errorData.errors);
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }
      const data = await response.json();
      console.log("Product was added.", data);
      alert("Product was added.");
      window.location.href = "/product/add";
    } catch (error) {
      console.error("Error while adding product", error);
    }
  };

  return (
    <div className="mainDiv">
      <h2>Add Product</h2>
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Code:</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={productData.code}
            onChange={handleFormInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Name:</Form.Label>
          <Form.Control
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleFormInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={productData.description}
            onChange={handleFormInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleFormInput}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={productData.price}
            onChange={handleFormInput}
          ></Form.Control>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleSaveProduct}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
