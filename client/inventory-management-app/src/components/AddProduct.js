import React from "react";

const AddProduct = () => {
  return (
    <div className="mainDiv">
      <h2>Add Product</h2>
      <form>
        <label>
          Item Name:
          <input type="text" />
        </label>
        <label>
          Quantity:
          <input type="number" />
        </label>
        <button type="submit">Add to Stock</button>
      </form>
    </div>
  );
};

export default AddProduct;
