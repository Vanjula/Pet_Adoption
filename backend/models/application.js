const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: /.+\@.+\..+/ 
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  homeType: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'farm'], 
  },
  petType: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird'], 
  },
  experience: {
    type: String,
    required: true,
  },
  image: { type: String },
  additionalInfo: {
    type: String,
    default: '', 
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
