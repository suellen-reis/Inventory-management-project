const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const session = require("express-session");

// Import User Mongoose schemas
let User = require("../models/userModel");

router.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

// Create register route
router
  .get("/register", (req, res) => {
    res.send("Register User");
  })
  .post("/register", async (req, res) => {
    // Async validation check of form elements
    await check("name", "Name is required").notEmpty().run(req);
    await check("email", "Email is required").notEmpty().run(req);
    await check("email", "Email is invalid").isEmail().run(req);
    await check("password", "Password is required").notEmpty().run(req);
    await check("confirm_password", "Confirm password is required")
      .notEmpty()
      .run(req);
    await check(
      "confirm_password",
      "Password and confirm password do not match"
    )
      .equals(req.body.password)
      .run(req);

    // Get validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save new user to MongoDB
      await newUser.save();

      res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  });

// Login route
router.post("/login", async (req, res, next) => {
  // Check form elements are submitted and valid
  await check("email", "Email is required").notEmpty().run(req);
  await check("email", "Email is invalid").isEmail().run(req);
  await check("password", "Password is required").notEmpty().run(req);

  // Get validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Error in authentication", err);
      return next(err);
    }
    if (!user) {
      console.log("User was not found.");
      return res
        .status(401)
        .json({ errors: [{ msg: "Invalid credentials." }] });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return next(err);
      }
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.SECRET,
        {
          expiresIn: "2h",
        }
      );
      // Send back the token
      return res.status(200).json({ token });
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    console.log("Logged out successfully");
  });
  res.status(200).json();
});

// Get user Information from database
/*router.get("/getUser", (req, res) => {
  res.send("Get user information");
});*/

module.exports = router;
