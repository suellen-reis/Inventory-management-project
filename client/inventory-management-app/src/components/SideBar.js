import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SideBarStyle.css";

const SideBar = () => {
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
    <div className="text-bg-dark col-auto min-vh-100 d-flex flex-column">
      <Navbar.Brand href="/" className="text-warning ms-3 mt-3 mb-3 col-lg-2">
        <i class="m-2 bi bi-globe-americas"></i>
        <span className="ms-1 fs-5 d-none d-lg-inline">Inventory App</span>
      </Navbar.Brand>
      <Nav className="flex-column mt-3 mt-md-0">
        {isLoggedIn && (
          <>
            <Nav.Link
              href="/"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-clipboard-data"></i>
              <span className="ms-2 d-none d-sm-inline">Dashboard</span>
            </Nav.Link>
            <Nav.Link
              href="/edit"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-pen"></i>
              <span className="ms-2 d-none d-sm-inline">Edit</span>
            </Nav.Link>
            <Nav.Link
              href="/addProduct"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-plus-square"></i>
              <span className="ms-2 d-none d-sm-inline">Add Product</span>
            </Nav.Link>
            <Nav.Link
              href="/stock"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-box-seam"></i>
              <span className="ms-2 d-none d-sm-inline">Stock</span>
            </Nav.Link>
            <Nav.Link
              onClick={handleLogout}
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-box-arrow-right"></i>
              <span className="ms-2 d-none d-sm-inline">Logout</span>
            </Nav.Link>
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
              href="/login"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-person-check"></i>
              <span className="ms-2 d-none d-sm-inline">Login</span>
            </Nav.Link>
            <Nav.Link
              href="/register"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-file-person"></i>
              <span className="ms-2 d-none d-sm-inline">Register</span>
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default SideBar;
