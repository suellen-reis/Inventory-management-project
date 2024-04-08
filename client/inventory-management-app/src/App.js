import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Routing from "./components/Routing";
import SideBar from "./components/SideBar";
import NavigationBar from "./components/NavigationBar";

function App() {
  // Check if user is logged in based on token stored in local storage
  const isLoggedIn = localStorage.getItem("token") !== null;
  return (
    <div className="App">
      <div className="row">
        <div className="12">
          <NavigationBar></NavigationBar>
        </div>
      </div>
      <div className="row">
        {isLoggedIn && (
          <>
            <div className="col-2">
              <SideBar></SideBar>
            </div>
            <div className="col-10" style={{ marginBottom: "50px" }}>
              <Routing></Routing>
            </div>
          </>
        )}
        {!isLoggedIn && (
          <>
            <div className="col-12">
              <Routing></Routing>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
