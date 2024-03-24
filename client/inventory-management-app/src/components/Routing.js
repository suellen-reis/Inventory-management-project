import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
// import Buy from "./Buy";
// import Error from "./Error";
import Login from "./Login";
// import Logout from "./Logout";
import AddProduct from "./AddProduct";
import Register from "./Register";
// import Edit from "./Edit";
import Stock from "./Stock";
import Dashboard from "./Dashboard";

const Routing = () => {
  return (
    <BrowserRouter>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" Component={Dashboard}></Route>
        {/* <Route path="/edit" Component={Edit}></Route> */}
        <Route path="/AddProduct" Component={AddProduct}></Route>
        {/* <Route path="/buy" Component={Buy}></Route> */}
        <Route path="/stock" Component={Stock}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/Register" Component={Register}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
