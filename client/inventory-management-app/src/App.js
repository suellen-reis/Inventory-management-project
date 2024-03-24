import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Routing from "./components/Routing";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-2">
          <SideBar></SideBar>
        </div>
        <div className="col-10">
          <Routing></Routing>
        </div>
      </div>
    </div>
  );
}

export default App;
