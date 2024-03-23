import React from "react";
import { Table } from "react-bootstrap";

const Stock = () => {
  const stockData = [
    {
      productNumber: 1,
      productName: "Product 1",
      category: "Category 1",
      description: "Description 1",
      cost: 100,
      purchase: {
        date: "2024-03-20",
        quantity: 10,
        unitCost: 100,
        totalCost: 1000,
      },
      sales: { date: "2024-03-25", units: 5, unitCost: 100, totalCost: 500 },
      balance: { units: 5, unitCost: 100, totalCost: 500 },
    },
    {
      productNumber: 2,
      productName: "Product 2",
      category: "Category 2",
      description: "Description 2",
      cost: 150,
      purchase: {
        date: "2024-03-22",
        quantity: 8,
        unitCost: 150,
        totalCost: 1200,
      },
      sales: { date: "2024-03-28", units: 3, unitCost: 150, totalCost: 450 },
      balance: { units: 5, unitCost: 150, totalCost: 750 },
    },
    // Add more products as needed
  ];

  return (
    <div className="mainDiv">
      <h2>Stock</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Purchase Date</th>
            <th>Purchase Quantity</th>
            <th>Purchase Unit Cost</th>
            <th>Purchase Total Cost</th>
            <th>Sales Date</th>
            <th>Sales Units</th>
            <th>Sales Unit Cost</th>
            <th>Sales Total Cost</th>
            <th>Balance Units</th>
            <th>Balance Unit Cost</th>
            <th>Balance Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((product, index) => (
            <tr key={index}>
              <td>{product.productNumber}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.cost}</td>
              <td>{product.purchase.date}</td>
              <td>{product.purchase.quantity}</td>
              <td>{product.purchase.unitCost}</td>
              <td>{product.purchase.totalCost}</td>
              <td>{product.sales.date}</td>
              <td>{product.sales.units}</td>
              <td>{product.sales.unitCost}</td>
              <td>{product.sales.totalCost}</td>
              <td>{product.balance.units}</td>
              <td>{product.balance.unitCost}</td>
              <td>{product.balance.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Stock;
