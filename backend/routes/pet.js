const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const mailer = require("../utils/mailer.js");
const Animal = require("../models/pet.js");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const addAnimal = async (animalData) => {
  try {
    const newAnimal = new Animal({
      ...animalData,
      image: animalData.imagePath,
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


const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use a unique name for each file
  }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res) => {
  const animalData = req.body; // Animal data from form
  const relativeImagePath = req.file ? `uploads/${req.file.filename}` : null; // Store relative path
  
  if (!relativeImagePath) {
    return res.status(400).json({ success: false, message: 'Image is required' });
  }

  const result = await addAnimal({ ...animalData, imagePath: relativeImagePath }); // Pass the relative path
  res.status(result.success ? 201 : 400).json(result);
});

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


router.delete('/delete/:id', async (req, res) => {
  const animalId = req.params.id;
  const result = await deleteAnimal(animalId);
  res.status(result.success ? 200 : 404).json(result);
});
router.get('/find/:id', async (req, res) => {
  const animalId = req.params.id;
  const result = await getAnimal(animalId);
  res.status(result.success ? 200 : 404).json(result);
});

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

router.get('/countByBreed', async (req, res) => {
  try {
    // Aggregate pets by breed and count the number of pets per breed
    console.log("Reached")
    const petCountByBreed = await Animal.aggregate([
      {
        $group: {
          _id: "$breed",  // Group by breed
          count: { $sum: 1 },  // Count the number of pets in each group
        }
      },
      {
        $sort: { count: -1 }  // Sort the results by the count in descending order
      }
    ]);

    // Return the result
    res.status(200).json(petCountByBreed);
  } catch (error) {
    console.error("Error fetching pet count by breed:", error);
    res.status(500).json({ message: "Error fetching pet count by breed", error });
  }
});


module.exports = router;
