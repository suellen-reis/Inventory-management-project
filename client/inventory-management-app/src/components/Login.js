import React, { useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const handleLogin = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err) => err.msg));
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("Login successful");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div data-bs-spy="scroll">
      <h2 style={{ textAlign: "center" }}>Login</h2>
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
      <Form
        noValidate
        validated={validated}
        style={{
          display: "block",
          width: "50%",
          padding: 30,
          marginLeft: "auto",
          marginRight: "auto",
          border: "solid 1px gray",
          borderRadius: 10,
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
