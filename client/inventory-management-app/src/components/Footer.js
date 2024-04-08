import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer fixed-bottom text-bg-dark p-3">
      <div>
        <Container>
          <div>
            Copyright © {year} Inventory Management. All Rights Reserved.
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
