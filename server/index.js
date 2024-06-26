// Import dependencies
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const config = require("./config/db_config");
const user_routes = require("./routes/user_router");
const product_routes = require("./routes/product_router");
// const cookieParser = require("cookie-parser");

//PORT
const PORT = process.env.PORT || 8000;

//Connect to mongodb and Start Server
//MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas: Database connected successfully.");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

//MongoDB Compass
/*mongoose
  .connect(config.database)
  .then(() => {
    console.log("MongoDB Compass: Database connected successfully.");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
*/

let db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to MongoDB");
});
db.on("error", function (err) {
  console.log("DB Error");
});

//Initialize Express
const app = express();

//Configure server(Middlewares)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(bodyParser.json());

//Initialize session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes pages
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Routes server/routes(middleware)
app.use("/user", user_routes);
app.use("/product", product_routes);

//Export
module.exports = app;
