// src/routes/adoption.js
const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/adoptionreq.js');
const Pet = require('../models/pet.js');
const User = require('../models/user.js'); // Assuming you have a User model defined
const authenticateToken = require('../utils/AuthDecode.js');
const mailer = require("../utils/mailer.js");

// Get all adoption requests
router.get('/all', async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({})
      .populate('user', 'username') // Populate user with specific fields (like email)
      .populate({
        path: 'pet', // Populate the pet details
        model: Pet,  // Specify the model if needed
        select: 'name breed age' // Specify which fields you want to retrieve from Pet
      });

    res.status(200).send(requests);
  } catch (error) {
    console.error('Error fetching adoption requests:', error);
    res.status(500).send({ error: 'Failed to fetch adoption requests', details: error.message });
  }
});

// Create a new adoption request
router.post('/add', authenticateToken, async (req, res) => {
  const { pet } = req.body; 
  const userId = req.userId; 

  const newRequest = new AdoptionRequest({ user: userId, pet }); 
  try {
    const savedRequest = await newRequest.save();
    res.status(201).send(savedRequest);
  } catch (error) {
    console.error('Error creating adoption request:', error);
    res.status(500).send({ error: 'Failed to create adoption request' });
  }
});

// Approve an adoption request by ID
router.post('/approve/:id',authenticateToken ,async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!updatedRequest) {
      return res.status(404).send({ error: "Request not found" });
    }
    // await mailer(
    //   email,
    //   "approve",
    //   `Welcome to the Pet Adoption Platform! ${updatedRequest}`
    // );
    res.status(200).send({ message: "Request approved", updatedRequest });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).send({ error: "Failed to approve request" });
  }
});

// Deny an adoption request by ID
router.post('/deny/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(id, { status: 'Denied' }, { new: true });
    if (!updatedRequest) {
      return res.status(404).send({ error: "Request not found" });
    }
    //  await mailer(
    //   email,
    //   "deny",
    //   `Welcome to the Pet Adoption Platform! ${updatedRequest}`
    // );
    res.status(200).send({ message: "Request denied", updatedRequest });
  } catch (error) {
    console.error("Error denying request:", error);
    res.status(500).send({ error: "Failed to deny request" });
  }
});

module.exports = router;
