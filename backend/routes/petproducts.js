const express = require("express");
const router = express.Router();
const Product = require('../models/PetProducts'); // Assuming PetProducts model is correct
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up directory for image uploads
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
    console.log("Fetching all pet products...111111111111111111");
    const petProductsData = await Product.find({});
    console.log(petProductsData);
    res.status(200).send({ message: 'Pet products fetched successfully!', petProducts: petProductsData });
  } catch (error) {
    console.error('Error fetching pet products:', error);
    res.status(500).send({ error: 'Failed to fetch pet products data' });
  }
});

// Fetch a single pet food product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from the URL params
    const petProductsData = await Product.findOne({ _id: id }); // Use findOne to fetch a single product by its ID
    if (!petProductsData) {
      return res.status(404).send({ error: 'Pet product not found' });
    }
    res.status(200).send({ message: 'Pet product fetched successfully!', petProducts: petProductsData });
  } catch (error) {
    console.error('Error fetching pet product:', error);
    res.status(500).send({ error: 'Failed to fetch pet product data' });
  }
});

// Search pet food products by name
router.get('/search', async (req, res) => {
  const { query } = req.query; 
  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    });
    res.status(200).send({ message: 'Products fetched successfully!', products });
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).send({ error: 'Failed to search for products' });
  }
});

// Fetch best pet food products
router.get('/best', async (req, res) => {
  try {
    const bestProducts = await Product.find({ best: true });
    res.status(200).json(bestProducts);
  } catch (error) {
    console.error('Error fetching best products:', error);
    res.status(500).json({ error: 'Failed to fetch best products' });
  }
});


router.put('/update/:id', upload.single("image"), async (req, res) => {
 
  const { id } = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.imagePath = `/uploads/${req.file.filename}`;  // Save the image path
  }

  try {
    console.log(`Editing product with ID: ${id}`);
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ 
      message: "Product updated successfully", 
      updatedProduct,
      imagePath: `/uploads/${req.file.filename}` // Return the image path in the response
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ error: "Failed to update product" });
  }
});

const editAnimal = async (animalId, updates) => {
  try {
    const updatedAnimal = await Product.findByIdAndUpdate(animalId, updates, { new: true, runValidators: true });
    if (!updatedAnimal) {
      return { success: false, message: 'Animal not found' };
    }
    return { success: true, message: 'Animal updated successfully!', animal: updatedAnimal };
  } catch (error) {
    console.error('Error updating animal:', error);
    return { success: false, message: 'Error updating animal', error };
  }
};

router.put('/edit/:id', upload.single('image'), async (req, res) => {
  const animalId = req.params.id;
  const updates = req.body;
  
  // Handle image upload
  const relativeImagePath = req.file ? `/uploads/${req.file.filename}` : null;
  if (req.file) {
    updates.image = relativeImagePath; // Save the relative path to the image field
  }

  try {
    // Update animal record
    const result = await editAnimal(animalId, updates);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error('Error updating animal:', error);
    return res.status(500).json({ success: false, message: 'Error updating animal', error });
  }
});

// Add new pet food product
router.post('/add', upload.single("image"), async (req, res) => {
  const productData = req.body;

  if (req.file) {
    productData.image = `/uploads/${req.file.filename}`; // Store image path
  }

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).send({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ error: "Failed to add product" });
  }
});

// Delete pet food product by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Deleting product with ID: ${id}`);
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Remove the image file if it exists
    if (deletedProduct.image) {
      const imagePath = path.join(__dirname, '..', deletedProduct.image);
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

router.get('/quantity', async (req, res) => {
  try {
    const category = 'Food'; // Get category from query parameters

    // Validate the category
    if (!category || !['Food', 'Toys', 'Accessories', 'Grooming'].includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Count products based on category
    const productCount = await Product.countDocuments({ category });

    // Send the count as the response
    res.json({ category, count: productCount });
  } catch (error) {
    console.error("Error fetching product quantities:", error);
    res.status(500).json({ message: "Error fetching quantities", error: error.message });
  }
});



// Fetch quantity of pet food products
router.get('/quantity', async (req, res) => {
  try {
    const petFoodData = await Product.find({});
    
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
