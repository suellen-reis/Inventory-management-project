import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
      console.log(decoded);
    }
  }, []);

  return (
    <div>
      <p>Dashboard</p>
      {userName && <p>Hello, {userName}!</p>}
      <div className="container-fluid">
        <div className="row">
          <div className=" d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p2 bg-info text-white border shadow-sm">
            <i className="bi bi-cart-plus fs-2"></i>
            <div>
              <p>Products</p>
              <h3>230</h3>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p2 bg-success text-white border shadow-sm">
            <i className="bi bi-currency-dollar fs-2"></i>
            <div>
              <p>Sales</p>
              <h3>100</h3>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p2 bg-warning text-white border shadow-sm">
            <i className="bi bi-box-seam fs-2"></i>
            <div>
              <p>Stock</p>
              <h3>500</h3>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-3 p2 bg-danger text-white border shadow-sm">
            <i className="bi bi-cart-x fs-2"></i>
            <div>
              <p>Out of Stock</p>
              <h3>50</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
