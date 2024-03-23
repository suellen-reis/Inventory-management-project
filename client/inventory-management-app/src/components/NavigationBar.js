import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Footer from "./Footer";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            {/* <Nav.Link href="/edit">Edit</Nav.Link> */}
            <Nav.Link href="/AddProduct">Add Product</Nav.Link>
            {/* <Nav.Link href="/buy">Buy </Nav.Link> */}
            <Nav.Link href="/stock">Stock</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Footer></Footer>
    </Navbar>
  );
};

export default NavigationBar;
