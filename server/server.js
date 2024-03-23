// Import dependencies
const dotenv = require("dotenv").config;
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const config = require("./config/db_config");

//PORT
const PORT = process.env.PORT || 8000;

//Connect to mongodb and Start Server
mongoose
  .connect(config.database)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

let db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to MongoDB");
});
db.on("error", function (err) {
  console.log("DB Error");
});

//Initialize Express
const app = express();

//Configure server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Initialize session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);
