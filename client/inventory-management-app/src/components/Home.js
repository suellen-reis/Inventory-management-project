import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Home</div>
      <p>You are not logged in.</p>
      <Button
        style={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        variant="primary"
        onClick={() => navigate("/login")}
      >
        Go to Login Page
      </Button>
    </div>
  );
};

export default Home;
