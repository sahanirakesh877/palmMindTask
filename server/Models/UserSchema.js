const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
    validate: [validator.isEmail, "enter valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Enter your Number"],
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },
});

const userSchema = mongoose.model("User", usersSchema);
module.exports = userSchema;
