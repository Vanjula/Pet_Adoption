const express = require("express");
const router = express.Router();
const petFood = require("../models/PetFood.js");

router.get('/all', async (req, res) => {
  try {
    console.log("Fetching all pet products...");
        const petFoodData = await petFood.find({});
    
    res.status(200).send({ message: 'Pet products fetched successfully!', PetFood: petFoodData });
  } catch (error) {
    console.error('Error fetching pet products:', error);
    res.status(500).send({ error: 'Failed to fetch pet products data' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query; 
  try {
    const products = await petFood.find({
      name: { $regex: query, $options: 'i' } 
    });

    res.status(200).send({ message: 'Products fetched successfully!', products });
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).send({ error: 'Failed to search for products' });
  }
});

router.get('/best', async (req, res) => {
  try {
    const bestProducts = await petFood.find({ best: true }); // Assuming you have a 'featured' field
    res.status(200).json(bestProducts);
  } catch (error) {
    console.error('Error fetching best products:', error);
    res.status(500).json({ error: 'Failed to fetch best products' });
  }
});


router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await petFood.find({ featured: true }); // Adjust this query based on how you define featured products
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

// Edit a pet food product by ID
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Assuming the updated data is sent in the body

  try {
    console.log(`Editing product with ID: ${id}`);
    const updatedProduct = await petFood.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ error: "Failed to update product" });
  }
});

// Add a new pet food product
router.post('/add', async (req, res) => {
  const productData = req.body; // Assuming product data is sent in the request body

  try {
    const newProduct = new petFood(productData);
    await newProduct.save();
    res.status(201).send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ error: "Failed to add product" });
  }
});


// Delete a pet food product by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Deleting product with ID: ${id}`);
    const deletedProduct = await petFood.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ error: "Failed to delete product" });
  }
});

// Fetch quantity of pet food products
router.get('/quantity', async (req, res) => {
  try {
    console.log("Fetching pet products quantity...");
    const petFoodData = await petFood.find({});
    
    // Assuming you want to return total quantities or any other logic
    const quantityData = petFoodData.map(product => ({
      name: product.name,
      quantity: product.qty // Adjust according to your model
    }));

    res.status(200).send({ message: 'Pet products quantity fetched successfully!', quantities: quantityData });
  } catch (error) {
    console.error('Error fetching pet products quantity:', error);
    res.status(500).send({ error: 'Failed to fetch pet products quantity' });
  }
});

module.exports = router;
