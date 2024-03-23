import React from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Login</h3>
      <Form
        style={{
          display: "block",
          width: "50%",
          padding: 30,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
