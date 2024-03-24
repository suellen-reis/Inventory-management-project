import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Footer from "./Footer";

const NavigationBar = () => {
  // Check if user is logged in based on token stored in local storage
  const isLoggedIn = localStorage.getItem("token") !== null;

  // Function to get logout endpoint from back end and logout the user
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          console.log(errorData.errors.map((err) => err.msg));
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }
      localStorage.removeItem("token");
      window.location.href = "/logout";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link href="/edit">Edit</Nav.Link>
                <Nav.Link href="/AddProduct">Add Product</Nav.Link>
                {/* <Nav.Link href="/buy">Buy </Nav.Link> */}
                <Nav.Link href="/stock">Stock</Nav.Link>
                <Button onClick={handleLogout}>
                  <i class="bi bi-box-arrow-right"></i>
                  Logout
                </Button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Footer></Footer>
    </Navbar>
  );
};

export default NavigationBar;
