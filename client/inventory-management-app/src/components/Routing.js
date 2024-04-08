import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import Dashboard from "./Dashboard";
import Edit from "./Edit";
import Error from "./Error";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Stock from "./Stock";

const Routing = () => {
  // Check if user is logged in based on token stored in local storage
  const isLoggedIn = localStorage.getItem("token") !== null;
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" Component={Dashboard}></Route>
            <Route path="/product/add" Component={AddProduct}></Route>
            <Route path="/product/stock" Component={Stock}></Route>
            <Route path="/product/edit" Component={Edit}></Route>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route path="/" Component={Home}></Route>
            <Route path="/user/login" Component={Login}></Route>
            <Route path="/user/register" Component={Register}></Route>
            <Route path="/user/logout" Component={Logout}></Route>
          </>
        )}

        <Route path="/*" Component={Error}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
