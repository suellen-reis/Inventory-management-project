import React, { useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const Edit = ({ isVisible, handleVisible, product, setProduct }) => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;
  const [errors, setErrors] = useState([]);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setProduct((prevProductData) => ({
      ...prevProductData,
      [name]: value,
    }));
  };

  // Fetch data from a POST request
  const handleSave = async (e) => {
    e.preventDefault();
    console.log(userId);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/product/edit`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
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
      console.log("Product was edited.", data);
      alert("Product was edited.");
    } catch (error) {
      console.error("Error while editing product", error);
    }
  };

  return (
    <div>
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
      <Modal show={isVisible} onHide={handleVisible}>
        <Modal.Header>
          <Modal.Title>Edit Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Code:</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={product.code}
                onChange={handleFormInput}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Name:</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleFormInput}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={product.description}
                onChange={handleFormInput}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleFormInput}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleFormInput}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVisible}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSave(e);
              handleVisible();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Edit;
