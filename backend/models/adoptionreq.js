const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId, // Make sure this is ObjectId
        ref: 'User', // Make sure this matches the name of your User model
        required: true,
    },
  pet: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the pet's ID
    ref: 'Pet',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);
module.exports = AdoptionRequest;
