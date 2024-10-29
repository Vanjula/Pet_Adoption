const express = require('express');
const router = express.Router();
const Category = require('../models/category'); // Ensure you have the correct path

// Existing GET route for fetching categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send({ error: 'Failed to fetch categories' });
  }
});

// POST route to add a new category
router.post('/categories', async (req, res) => {
  const { name, productCount, image } = req.body; // Destructure data from request body

  // Validate the input
  if (!name) {
    return res.status(400).send({ error: 'Category name is required' });
  }

  try {
    const newCategory = new Category({
      name,
      productCount: productCount || 0, // Default to 0 if not provided
      image,
    });

    await newCategory.save(); // Save the new category to the database
    res.status(201).send({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).send({ error: 'Failed to add category' });
  }
});

module.exports = router;
