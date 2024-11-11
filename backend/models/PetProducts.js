const mongoose = require("mongoose");

const petProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  qty: {
    type: Number,
    required: true,
    min: 1 
  },
  price: {
    type: Number,
    required: true,
    min: 0 
  },
  image: { 
    type: String, 
    required: false // You can make this required if the image is mandatory
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Toys', 'Accessories', 'Grooming'] // Example categories, modify as needed
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
    featured: { type: Boolean, default: false } 
});

const PetProduct = mongoose.model("products", petProductSchema);

module.exports = PetProduct;
