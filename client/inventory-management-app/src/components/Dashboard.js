import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import BarChart from "./BarChart";
import { Table } from "react-bootstrap";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const decodedToken = token ? jwtDecode(token) : null;
  const [productsData, setProductsData] = useState([]);
  const [errors, setErrors] = useState([]);

  const labels =
    productsData?.products?.map((product) => product.productName) || [];

  const productsQuantity =
    productsData?.products?.map((product) => product.quantity) || [];

  useEffect(() => {
    if (token) {
      setUserName(decodedToken.name);
    }
  }, [token, decodedToken]);

  //Check if there is a Token
  useEffect(() => {
    if (!token) {
      window.location.href = "/user/login";
    }
  }, [token]);

  const handleError = async (response, setErrors) => {
    const errorData = await response.json();
    if (errorData.errors) {
      setErrors(errorData.errors.map((err) => err.msg));
      console.log(errorData.errors);
    } else {
      throw new Error(
        errorData.msg || "An error occurred while fetching Stock Data"
      );
    }
  };

  // Fetch data from a GET request
  useEffect(() => {
    const fetchProducts = async () => {
      if (token) {
        console.log("Fetch Product Information to Dashboard");
        try {
          const response = await fetch(
            `${process.env.REACT_APP_HOST}/product`,
            {
              method: "GET",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            await handleError(response, setErrors);
            return;
          }
          const data = await response.json();
          setProductsData(data);
          console.log("Products info was loaded.");
        } catch (error) {
          console.error("Error while fetching product", error);
        }
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      {userName && <h5>Hello, {userName}!</h5>}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className=" d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-2 p2 bg-info text-white border shadow-sm">
            <i className="bi bi-cart-plus fs-2"></i>
            <div>
              <p>Products</p>
              <h3>{productsData?.productsCount}</h3>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-2 p2 bg-success text-white border shadow-sm">
            <i className="bi bi-currency-dollar fs-2"></i>
            <div>
              <p>Amount</p>
              <h3>
                {productsData?.totalAmount?.length > 0
                  ? productsData?.totalAmount[0].total_amount.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )
                  : 0}
              </h3>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-2 p2 bg-warning text-white border shadow-sm">
            <i className="bi bi-box-seam fs-2"></i>
            <div>
              <p>Stock</p>
              <h3>
                {productsData?.totalQuantity?.length > 0
                  ? productsData?.totalQuantity[0].total_quantity
                  : 0}
              </h3>
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center col-12 col-sm-6 col-md-4 col-lg-2 p2 bg-danger text-white border shadow-sm">
            <i className="bi bi-cart-x fs-2"></i>
            <div>
              <p>Out of Stock</p>
              <h3>{productsData?.outOfStockCount}</h3>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>

      {productsData?.products && (
        <BarChart
          labels={labels}
          productsQuantity={productsQuantity}
        ></BarChart>
      )}

      {productsData?.outOfStock?.length < 1 ? (
        <div></div>
      ) : (
        <div>
          <h4 className="text-danger">Out of Stock Products</h4>
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {productsData?.outOfStock?.map((product, index) => (
                <tr key={index}>
                  <td>{product.code}</td>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
