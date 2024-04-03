import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import "./styles/SideBarStyle.css";

const SideBar = () => {
  // Check if user is logged in based on token stored in local storage
  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div className="text-bg-dark col-auto min-vh-100 d-flex flex-column">
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
              href="/product/add"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-plus-square"></i>
              <span className="ms-2 d-none d-sm-inline">Add Product</span>
            </Nav.Link>
            <Nav.Link
              href="/product/stock"
              className="text-white my-1 nav-links"
              aria-current="page"
            >
              <i className="m-2 bi bi-box-seam"></i>
              <span className="ms-2 d-none d-sm-inline">Stock</span>
            </Nav.Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default SideBar;
