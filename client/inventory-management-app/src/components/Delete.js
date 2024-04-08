import React from "react";
import { Button, Modal } from "react-bootstrap";

const Delete = ({ isVisible, handleVisible, product, onDelete }) => {
  return (
    <div>
      <Modal show={isVisible} onHide={handleVisible}>
        <Modal.Header>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm if the product {product.productName} should be deleted.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVisible}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onDelete();
              handleVisible();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
