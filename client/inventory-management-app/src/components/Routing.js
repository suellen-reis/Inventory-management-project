import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import Buy from "./Buy";
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
            <Route path="/edit" Component={Edit}></Route>
            <Route path="/addProduct" Component={AddProduct}></Route>
            <Route path="/stock" Component={Stock}></Route>
            <Route path="/buy" Component={Buy}></Route>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route path="/" Component={Home}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/register" Component={Register}></Route>
            <Route path="/logout" Component={Logout}></Route>
          </>
        )}

        <Route path="/*" Component={Error}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
