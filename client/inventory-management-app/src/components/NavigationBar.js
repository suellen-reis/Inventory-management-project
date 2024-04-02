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
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/user/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      window.location.href = "/user/logout";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/" className="text-warning">
          <i className="m-2 bi bi-globe-americas"></i>
          <span className="ms-0 fs-5 d-none d-lg-inline">Inventory App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn && (
              <>
                <Button onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </Button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Link
                  href="/"
                  className="text-white my-1 nav-links"
                  aria-current="page"
                >
                  <i className="m-2 bi bi-house-door"></i>
                  <span className="ms-2 d-none d-sm-inline">Home</span>
                </Nav.Link>
                <Nav.Link
                  href="/user/login"
                  className="text-white my-1 nav-links"
                >
                  <i className="m-2 bi bi-person-check"></i>
                  <span className="ms-2 d-none d-sm-inline">Login</span>
                </Nav.Link>
                <Nav.Link
                  href="/user/register"
                  className="text-white my-1 nav-links"
                >
                  <i className="m-2 bi bi-person-vcard"></i>
                  <span className="ms-2 d-none d-sm-inline">Register</span>
                </Nav.Link>
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
