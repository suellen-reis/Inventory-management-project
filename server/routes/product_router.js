const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

let Product = require("../models/productModel");
const { json } = require("body-parser");

// Check token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = decoded;
    next();
  });
}

// Add route
router
  .route("/add")

  .post(verifyToken, async (req, res) => {
    try {
      await check("productName", "Product name is required")
        .notEmpty()
        .run(req);
      await check("code", "Product code is required").notEmpty().run(req);
      await check("description", "Description is required").notEmpty().run(req);
      await check("price", "Price is required")
        .notEmpty()
        .isFloat({ min: 0.01 })
        .run(req);
      await check("quantity", "Quantity is required.")
        .notEmpty()
        .isInt({ min: 1 })
        .run(req);
      console.log(req.body);

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let product = new Product();
      product.code = req.body.code;
      product.productName = req.body.productName;
      product.description = req.body.description;
      product.quantity = req.body.quantity;
      product.price = req.body.price;
      product.total = product.quantity * product.price;
      product.userId = req.body.userId;

      await product.save();
      res.json({ message: "Product was successfully added" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error in the Server" });
    }
  });

//Route to get products from database (Stock)
router.route("/stock").get(verifyToken, async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.headers.authorization);
    console.log("Decoded", decodedToken);

    // Load stock based on userId
    const products = await Product.find({ userId: decodedToken.id });
    res.json(products);
  } catch (err) {
    console.log(err, "Error loading stock from server.");
    res
      .status(500)
      .json({ error: "Internal Server Error while loading stock." });
  }
});

// Route to update product
router
  .route("/edit")
  .get(async (req, res) => {
    try {
      const product = await Product.find(req.params.id);
      res.json({ product: product });
    } catch (err) {
      console.error("Server Error fetching product.", err);
      res.status(500).json({ error: "Server Error fetching product" });
    }
  })
  .post(async (req, res) => {
    let product = {
      code: req.body.code,
      productName: req.body.productName,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      total: product.quantity * product.price,
      userId: req.body.userId,
    };
    const query = { _id: req.params.id };
    try {
      await Product.updateOne(query, product);
      res.json({ message: "Successfully Updated" });
    } catch (err) {
      console.error("Server Error updating product:", err);
      res.status(500).json({ error: "Server Error uptading product" });
    }
  });

// Route to delete product
router
  .route("/delete")
  .get(async (req, res) => {
    try {
      const product = await Product.find(req.params.id);
      res.json({ product: product });
    } catch (err) {
      console.error("Server Error fetching product", err);
      res.status(500).json({ error: "Server Error fetching product" });
    }
  })
  .delete(async (req, res) => {
    try {
      const query = { _id: req.params.id };
      const response = await Product.deleteOne(query);
      if (response.deleteCount > 0) {
        res.json({ message: "Product was deleted" });
      } else {
        res.status(404).json({ error: "Product was not found." });
      }
    } catch (err) {
      console.error("Server Error deleting product", err);
      res.status(500).json({ error: "Server Error deleting product" });
    }
  });

module.exports = router;
