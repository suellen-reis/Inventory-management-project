import React from "react";
import { ListGroup } from "react-bootstrap";

const Home = () => {
  return (
    <div
      style={{
        width: "50%",
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2>Welcome to Inventory Manager</h2>
      <p>
        Efficiently manage your inventory with our easy-to-use application. Keep
        track of your stock.
      </p>
      <h3>Key Features:</h3>
      <ListGroup as="ol">
        <ListGroup.Item as="li">Stock Management</ListGroup.Item>
        <ListGroup.Item as="li">Reporting</ListGroup.Item>
        <ListGroup.Item as="li">User Profile</ListGroup.Item>
      </ListGroup>
      <ListGroup className="mt-5">
        <ListGroup.Item action href="/register" variant="primary">
          New User: Register Here.
        </ListGroup.Item>
        <ListGroup.Item action href="/login" variant="success">
          Existing User: Login Here
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Home;
