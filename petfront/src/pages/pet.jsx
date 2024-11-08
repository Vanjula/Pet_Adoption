import React, { useState, useEffect } from "react";
import dog_Img from "../components/assets/placeholder.png"; 
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL ;

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPetId, setEditingPetId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    breed: "",
    age: "",
    image: null,
  });

  useEffect(() => {
    fetch(`${apiUrl}/pet/all`)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (pet) => {
    setEditingPetId(pet._id);
    setEditFormData({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      image: null, 
    });
  };

  // Handle edit button click
  // const handleEditClick = (pet) => {
  //   setEditingPetId(pet._id);
  //   setEditFormData({ name: pet.name, breed: pet.breed, age: pet.age });
  // };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("breed", editFormData.breed);
    formData.append("age", editFormData.age);
    if (editFormData.image) {
      formData.append("image", editFormData.image);
    }

    try {
      const response = await fetch(`${apiUrl}/pet/edit/${editingPetId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Edit successful:", data);
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet._id === editingPetId ? { ...pet, ...editFormData } : pet
          )
        );
        setEditingPetId(null); 
      } else {
        console.error("Edit failed:", data.error);
      }
    } catch (error) {
      console.error("Error editing pet:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPetId(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/pet/delete/${id}`, {
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
                <input type="file" name="image" onChange={handleImageChange} />
                {editFormData.image && (
                  <p>Selected Image: {editFormData.image.name}</p>
                )}
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{pet.name}</h3>
                <img
                  src={pet.image ? `${apiUrl}/${pet.image}` : dog_Img}
                  alt={pet.name}
                  className="pet-image"
                  loading="lazy"
                />

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
        <div className="Adminpet">
          <Link to="addpet">Add New Pet Food</Link>{" "}
        </div>
      </ul>
    </div>
  );
};

export default Pet;
