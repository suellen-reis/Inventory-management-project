import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        className="text-center"
        style={{
          width: "50%",
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card.Header as="h5">Logout</Card.Header>
        <Card.Text>You have been logged out.</Card.Text>
        <Button
          style={{
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          variant="primary"
          onClick={() => navigate("/")}
        >
          Go to HomePage
        </Button>
      </Card>
    </div>
  );
};

export default Logout;
