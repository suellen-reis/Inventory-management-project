import React from "react";
import { Form, Button } from "react-bootstrap";

const Edit = () => {
  return (
    <div className="mainDiv">
      <h2>Edit</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Item Name:</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control type="number"></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default Edit;
