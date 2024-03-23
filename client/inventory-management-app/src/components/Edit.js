import React from "react";

const Edit = () => {
  return (
    <div className="mainDiv">
      <h2>Edit</h2>
      <form>
        <label>
          Item Name:
          <input type="text" />
        </label>
        <label>
          Quantity:
          <input type="number" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
