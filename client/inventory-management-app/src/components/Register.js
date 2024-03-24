import React, { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";

const RegisterPage = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // State to manage errors
  const [errors, setErrors] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Array to store error messages
    const fieldErrors = [];

    // Check if any of the form fields are empty
    if (!formData.name) {
      fieldErrors.push("Name is required");
    }
    if (!formData.email) {
      fieldErrors.push("Email is required");
    }
    if (!formData.password) {
      fieldErrors.push("Password is required");
    }
    if (!formData.confirm_password) {
      fieldErrors.push("Confirm password is required");
    }

    // If there are field errors, set them in the state and return
    if (fieldErrors.length > 0) {
      setErrors(fieldErrors.map((msg, index) => ({ id: index, msg })));
      return;
    }

    // Make a fetch request to the server endpoint for registration
    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        // If there are errors, set them in the state
        setErrors(data.errors || []);
      } else {
        // Handle successful registration (e.g., redirect)
        console.log("User registered successfully");
        alert("registration successful");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      data-bs-spy="scroll"
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>
      {/* Display errors */}
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <Alert key={error.id} variant="danger">
              {error.msg}
            </Alert>
          ))}
        </div>
      )}

      {/* Registration form */}
      <Form
        onSubmit={handleSubmit}
        style={{
          display: "block",
          width: "50%",
          padding: 30,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 50,
        }}
      >
        {/* Name input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Email input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Password input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Confirm Password input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="confirm_password">Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Submit button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
