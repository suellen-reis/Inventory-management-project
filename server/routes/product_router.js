const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

let Product = require("../models/productModel");

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

    // TODO userId
    const products = await Product.find({ userId: decodedToken.id });
    res.json(products);
  } catch (err) {
    console.log(err, "Error loading stock from server.");
    res
      .status(500)
      .json({ error: "Internal Server Error while loading stock." });
  }
});

module.exports = router;
