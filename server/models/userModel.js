let mongoose = require("mongoose");

// User Schema
let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "Password must be at least 4 characters "],
    },
  },
  {
    timestamps: true,
  }
);

// Export model
let User = (module.exports = mongoose.model("User", userSchema));
