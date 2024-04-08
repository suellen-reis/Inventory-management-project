const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

let Product = require("../models/productModel");
// const { json } = require("body-parser");

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
        .isInt({ min: 0 })
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
router.route("/edit").put(async (req, res) => {
  console.log("Edit backend", req.body);
  let product = {
    code: req.body.code,
    productName: req.body.productName,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    total: req.body.quantity * req.body.price,
    userId: req.body.userId,
  };
  try {
    await Product.updateOne({ _id: req.body._id }, product);
    res.json({ message: "Successfully Updated" });
  } catch (err) {
    console.error("Server Error updating product:", err);
    res.status(500).json({ error: "Server Error uptading product" });
  }
});

// Route to delete product
router.route("/delete").delete(async (req, res) => {
  try {
    const response = await Product.deleteOne({ _id: req.body.id });
    console.log(response);
    if (response.deletedCount > 0) {
      res.json({ message: "Product was deleted" });
    } else {
      res.status(404).json({ error: "Product was not found." });
    }
  } catch (err) {
    console.error("Server Error deleting product", err);
    res.status(500).json({ error: "Server Error deleting product" });
  }
});

router.route("/").get(verifyToken, async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.headers.authorization);
    console.log("Decoded", decodedToken);

    // Load products based on userId
    const products = await Product.find({ userId: decodedToken.id }).sort({
      productName: 1,
    });
    const productsCount = await Product.countDocuments({
      userId: decodedToken.id,
    });

    const totalQuantity = await Product.aggregate([
      {
        $match: {
          userId: new ObjectId(decodedToken.id),
        },
      },
      {
        $group: {
          _id: null,
          total_quantity: { $sum: "$quantity" },
        },
      },
    ]);

    const totalAmount = await Product.aggregate([
      {
        $match: {
          userId: new ObjectId(decodedToken.id),
        },
      },
      {
        $group: {
          _id: null,
          total_amount: { $sum: "$total" },
        },
      },
    ]);

    const outOfStockCount = await Product.countDocuments({
      userId: decodedToken.id,
      quantity: 0,
    });
    const outOfStock = await Product.find({
      userId: decodedToken.id,
      quantity: 0,
    });

    res.json({
      products: products,
      productsCount: productsCount,
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
      outOfStockCount: outOfStockCount,
      outOfStock: outOfStock,
    });
  } catch (err) {
    console.log(err, "Error getting products from server.");
    res
      .status(500)
      .json({ error: "Internal Server Error while getting products." });
  }
});

module.exports = router;
