import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const Edit = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mainDiv">
      <h2>Edit</h2>
      <Button variant="primary" onClick={handleVisible}>
        Edit Modal
      </Button>
      <Modal show={isVisible} onHide={handleVisible}>
        <Modal.Header>
          <Modal.Title>Edit Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Code:</Form.Label>
              <Form.Control type="text" name="code"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Name:</Form.Label>
              <Form.Control type="text" name="productName"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" name="description"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control type="number" name="quantity"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="number" name="price"></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVisible}>
            Close
          </Button>
          <Button variant="primary" onClick={handleVisible}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Edit;
