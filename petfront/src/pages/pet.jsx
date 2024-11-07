import React, { useState, useEffect } from "react";
import dog_Img from "../components/assets/placeholder.png";

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPetId, setEditingPetId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    breed: "",
    age: "",
  });

  // Fetch all pets on component mount
  useEffect(() => {
    fetch("http://localhost:5000/pet/all")
      .then((response) => response.json())
      .then((data) => {
        setPets(data.animals);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle edit button click
  const handleEditClick = (pet) => {
    setEditingPetId(pet._id);
    setEditFormData({ name: pet.name, breed: pet.breed, age: pet.age });
  };

  // Handle edit form field change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save edited data to the server
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/pet/edit/${editingPetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Edit successful:", data);
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet._id === editingPetId ? { ...pet, ...editFormData } : pet
          )
        );
        setEditingPetId(null); // Exit edit mode
      } else {
        console.error("Edit failed:", data.error);
      }
    } catch (error) {
      console.error("Error editing pet:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingPetId(null);
  };

  // Delete pet from the server
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/pet/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Delete successful:", data);
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  return (
    <div className="Adminpet">
      <h1>List of Pets</h1>
      <ul>
        {pets.map((pet) => (
          <li key={pet._id} className="pet-item">
            {editingPetId === pet._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="breed"
                  value={editFormData.breed}
                  onChange={handleEditChange}
                  placeholder="Breed"
                />
                <input
                  type="number"
                  name="age"
                  value={editFormData.age}
                  onChange={handleEditChange}
                  placeholder="Age"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{pet.name}</h3>
                <img src={dog_Img} alt={pet.name} />
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age} years</p>

                <div className="pet-buttons">
                  <button
                    onClick={() => handleEditClick(pet)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pet._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pet;
