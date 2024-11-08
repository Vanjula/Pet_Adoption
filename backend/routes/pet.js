const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const mailer = require("../utils/mailer.js");
const Animal = require("../models/pet.js");
const multer = require("multer");

// Set up multer for file upload
const storage = multer.memoryStorage(); // Store file in memory as binary data
const upload = multer({ storage: storage });

// Add a new animal (with image)
const addAnimal = async (animalData, imageBuffer) => {
  try {
    const newAnimal = new Animal({
      ...animalData,
      image: imageBuffer, // Save the image buffer as binary
    });
    await newAnimal.save();
    return { success: true, message: 'Animal added successfully!', animal: newAnimal };
  } catch (error) {
    console.error('Error adding animal:', error);
    return { success: false, message: 'Error adding animal', error };
  }
};

// Edit an existing animal
const editAnimal = async (animalId, updates) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(animalId, updates, { new: true, runValidators: true });
    if (!updatedAnimal) {
      return { success: false, message: 'Animal not found' };
    }
    return { success: true, message: 'Animal updated successfully!', animal: updatedAnimal };
  } catch (error) {
    console.error('Error updating animal:', error);
    return { success: false, message: 'Error updating animal', error };
  }
};

// Delete an animal
const deleteAnimal = async (animalId) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(animalId);
    if (!deletedAnimal) {
      return { success: false, message: 'Animal not found' };
    }
    return { success: true, message: 'Animal deleted successfully!', animal: deletedAnimal };
  } catch (error) {
    console.error('Error deleting animal:', error);
    return { success: false, message: 'Error deleting animal', error };
  }
};

// Get all animals (with pagination)
const getAllAnimals = async (limit = 10) => {
  try {
    const animals = await Animal.find().limit(limit);
    return { success: true, animals };
  } catch (error) {
    console.error('Error fetching animals:', error);
    return { success: false, message: 'Error fetching animals', error };
  }
};

const getAnimal = async (id) => {
  try {
    const animal = await Animal.findById(id);
    if (!animal) {
      return { success: false, message: 'Animal not found' };
    }
    return { success: true, animal };
  } catch (error) {
    console.error('Error fetching animal:', error);
    return { success: false, message: 'Error fetching animal', error };
  }
};

// Routes

// Add an animal
router.post('/add', upload.single('image'), async (req, res) => {
  const animalData = req.body; // Animal data from form
  const imageBuffer = req.file ? req.file.buffer : null; // Image buffer from uploaded file
  
  if (!imageBuffer) {
    return res.status(400).json({ success: false, message: 'Image is required' });
  }

  const result = await addAnimal(animalData, imageBuffer); // Pass the buffer along with other animal data
  res.status(result.success ? 201 : 400).json(result);
});

// Edit an existing animal
router.put('/edit/:id', async (req, res) => {
  const animalId = req.params.id;
  const updates = req.body;
  const result = await editAnimal(animalId, updates);
  res.status(result.success ? 200 : 404).json(result);
});

// Delete an animal
router.delete('/delete/:id', async (req, res) => {
  const animalId = req.params.id;
  const result = await deleteAnimal(animalId);
  res.status(result.success ? 200 : 404).json(result);
});

// Get an animal by ID
router.get('/find/:id', async (req, res) => {
  const animalId = req.params.id;
  const result = await getAnimal(animalId);
  res.status(result.success ? 200 : 404).json(result);
});

// Get all animals
router.get('/all', async (req, res) => {
  try {
    const animals = await Animal.find();
    
   const animalsWithBase64Images = animals.map(animal => {
  if (animal.image && animal.image.data) {
    const base64Image = `data:image/jpeg;base64,${animal.image.data.toString('base64')}`;
    animal.image = base64Image; // Assign the base64 string to animal.image
    console.log('Base64 Image:', base64Image);  // Log the base64 string to verify
  }
  return animal;
});


    res.status(200).json({ success: true, animals: animalsWithBase64Images });
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ success: false, message: 'Error fetching animals' });
  }
});

// Search animals based on query parameters
router.get('/search', async (req, res) => {
  const { name, breed, area, type } = req.query;

  const filter = {};
  if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
  if (breed) filter.breed = { $regex: breed, $options: 'i' };
  if (area) filter.area = { $regex: area, $options: 'i' };
  if (type) filter.type = { $regex: type, $options: 'i' };

  try {
    const animals = await Animal.find(filter);
    res.status(200).json({ success: true, data: animals });
  } catch (error) {
    console.error('Error during animal search:', error);
    res.status(500).json({ success: false, error: 'Failed to search animals' });
  }
});

// Dashboard content analytics
router.post('/dash/content', async (req, res) => {
  try {
    const breedAnalytics = await Animal.aggregate([
      { $group: { _id: "$breed", count: { $sum: 1 } } },
    ]);

    const colorAnalytics = await Animal.aggregate([
      { $group: { _id: "$color", count: { $sum: 1 } } },
    ]);

    const formattedBreedData = breedAnalytics.map(item => ({
      breed: item._id,
      count: item.count,
    }));

    const formattedColorData = colorAnalytics.map(item => ({
      color: item._id,
      count: item.count,
    }));

    // Send the formatted data to the frontend
    res.json({
      breeds: formattedBreedData,
      colors: formattedColorData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
