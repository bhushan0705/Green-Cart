const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: [String],
  price: Number,
  offerPrice: Number,
  image: [String],
  category: String,
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("products", productSchema);
