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
    <div className="mainDiv">
      <p>Dashboard</p>
      {userName && <p>Hello, {userName}!</p>}
      <div className="container-fluid">
        <div className="row g-3 my-2">
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center">
              <div>
                <h3 className="fs-2">230</h3>
                <p className="fs-5">Products</p>
              </div>
              <i className="bi bi-cart-plus p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center">
              <div>
                <h3 className="fs-2">100</h3>
                <p className="fs-5">Sales</p>
              </div>
              <i className="bi bi-currency-dollar p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center">
              <div>
                <h3 className="fs-2">500</h3>
                <p className="fs-5">Stock</p>
              </div>
              <i className="bi bi-box-seam p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center">
              <div>
                <h3 className="fs-2">50</h3>
                <p className="fs-5">Others</p>
              </div>
              <i className="bi bi-file-bar-graph p-3 fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
