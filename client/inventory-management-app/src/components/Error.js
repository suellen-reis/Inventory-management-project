import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        bg="danger"
        text="light"
        className="text-center"
        style={{
          width: "50%",
          marginTop: 20,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card.Text>Page Not Found</Card.Text>
        <Button
          style={{
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          variant="light"
          onClick={() => navigate("/")}
        >
          Go to HomePage
        </Button>
      </Card>
    </div>
  );
};

export default Error;
