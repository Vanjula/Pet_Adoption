// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  productCount: { type: Number, default: 0 }, // Number of products in the category
  image: { type: String }, // URL or path to the category image
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
