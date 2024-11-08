const mongoose = require('mongoose');

// Define the schema for the pet data
const petSchema = new mongoose.Schema({
  ID: {
    type: Number, 
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number, 
  },
  sex: {
    type: String,
    enum: ['male', 'female'], 
  },
  breed: {
    type: String,
    default: 'Unknown Mix'
  },
  date_found: {
    type: Date,
  },
  adoptable_from: {
    type: Date,
  },
  posted: {
    type: Date,
  },
  color: {
    type: String,
  },
  coat: {
    type: String,
  },
  size: {
    type: String,
  },
  image: { type: String },
  neutered: {
    type: String,
    enum: ['yes', 'no'],
  }
});

// Create the model from the schema
const Pet = mongoose.model('pet', petSchema); // Change 'pets' to 'pet' to match the collection name

module.exports = Pet;
