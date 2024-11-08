const express = require("express");
const router = express.Router();
const petFood = require("../models/PetFood.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Fetch all pet food products
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
    const bestProducts = await petFood.find({ best: true });
    res.status(200).json(bestProducts);
  } catch (error) {
    console.error('Error fetching best products:', error);
    res.status(500).json({ error: 'Failed to fetch best products' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const featuredProducts = await petFood.find({ featured: true });
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
});

router.put('/edit/:id', upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.imagePath = `/uploads/${req.file.filename}`;
  }

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

router.post('/add', upload.single("image"), async (req, res) => {
  const productData = req.body;

  if (req.file) {
    productData.image= `/uploads/${req.file.filename}`; // Store image path
  }

  try {
    const newProduct = new petFood(productData);
    await newProduct.save();
    res.status(201).send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ error: "Failed to add product" });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Deleting product with ID: ${id}`);
    const deletedProduct = await petFood.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    if (deletedProduct.imagePath) {
      const imagePath = path.join(__dirname, '..', deletedProduct.imagePath);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err);
        else console.log("Image deleted successfully");
      });
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
    
    const quantityData = petFoodData.map(product => ({
      name: product.name,
      quantity: product.qty
    }));

    res.status(200).send({ message: 'Pet products quantity fetched successfully!', quantities: quantityData });
  } catch (error) {
    console.error('Error fetching pet products quantity:', error);
    res.status(500).send({ error: 'Failed to fetch pet products quantity' });
  }
});

module.exports = router;
