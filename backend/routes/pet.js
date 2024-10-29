const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const mailer = require("../utils/mailer.js");
const Animal= require("../models/pet.js");
// Add a new animal
const addAnimal = async (animalData) => {
  try {
    const newAnimal = new Animal(animalData);
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

// Get all animals
const getAllAnimals = async () => {
  try {
    const animals = await  Animal.find().limit(10);
    return { success: true, animals };
  } catch (error) {
    console.error('Error fetching animals:', error);
    return { success: false, message: 'Error fetching animals', error };
  }
};
const getAnimal = async (id) => {
  try {
    const animals = await Animal.findById(id);
    return { success: true, animals };
  } catch (error) {
    console.error('Error fetching animals:', error);
    return { success: false, message: 'Error fetching animals', error };
  }
};

// Routes
router.post('/add', async (req, res) => {
    console.log("reached");
  const animalData = req.body;
  const result = await addAnimal(animalData);
  res.status(result.success ? 201 : 400).json(result);
});

router.put('/edit/:id', async (req, res) => {
  const animalId = req.params.id;
  const updates = req.body;
  const result = await editAnimal(animalId, updates);
  res.status(result.success ? 200 : 404).json(result);
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
        console.log("reached");
  const result = await getAllAnimals();
  console.log(result)
  res.status(result.success ? 200 : 500).json(result);
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

router.post('/dash/content',async (req,res)=>{
 try {
  console.log('hi')
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
