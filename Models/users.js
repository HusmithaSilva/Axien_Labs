const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  price: { type: String, unique: false },
  stock: { type: String, unique: false },
});

const User = mongoose.model("user", userSchema);
exports.User = User;
