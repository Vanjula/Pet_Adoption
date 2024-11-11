import React, { useState, useEffect } from "react";
import dog_Img from "../components/assets/placeholder.png";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPetId, setEditingPetId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    breed: "",
    age: "",
    sex: "male",
    color: "",
    coat: "",
    size: "",
    image: null,
    neutered: "yes",
    date_found: "",
    adoptable_from: "",
    posted: "",
  });

  // Fetch pets data
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
    setEditingPetId(pet._id); // Set the pet id to edit
    setEditFormData({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      sex: pet.sex,
      color: pet.color,
      coat: pet.coat,
      size: pet.size,
      neutered: pet.neutered,
      date_found: pet.date_found,
      adoptable_from: pet.adoptable_from,
      posted: pet.posted,
      image: null, // Optional: if you want to keep the image, pass it as a URL
    });
  };

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
    formData.append("sex", editFormData.sex);
    formData.append("color", editFormData.color);
    formData.append("coat", editFormData.coat);
    formData.append("size", editFormData.size);
    formData.append("neutered", editFormData.neutered);
    formData.append("date_found", editFormData.date_found);
    formData.append("adoptable_from", editFormData.adoptable_from);
    formData.append("posted", editFormData.posted);
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
    <div className="editpetform">
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
                <select
                  name="sex"
                  value={editFormData.sex}
                  onChange={handleEditChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="text"
                  name="color"
                  value={editFormData.color}
                  onChange={handleEditChange}
                  placeholder="Color"
                />
                <input
                  type="text"
                  name="coat"
                  value={editFormData.coat}
                  onChange={handleEditChange}
                  placeholder="Coat"
                />
                <input
                  type="text"
                  name="size"
                  value={editFormData.size}
                  onChange={handleEditChange}
                  placeholder="Size"
                />
                <select
                  name="neutered"
                  value={editFormData.neutered}
                  onChange={handleEditChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <input
                  type="date"
                  name="date_found"
                  value={editFormData.date_found}
                  onChange={handleEditChange}
                  placeholder="Date Found"
                />
                <input
                  type="date"
                  name="adoptable_from"
                  value={editFormData.adoptable_from}
                  onChange={handleEditChange}
                  placeholder="Adoptable From"
                />
                <input
                  type="date"
                  name="posted"
                  value={editFormData.posted}
                  onChange={handleEditChange}
                  placeholder="Posted"
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
                  src={pet.image ? `${apiUrl}${pet.image}` : dog_Img}
                  alt={pet.name}
                  className="pet-image"
                  loading="lazy"
                />
                <p>Breed: {pet.breed}</p>
                <p>Age: {pet.age} years</p>
                <p>Sex: {pet.sex}</p>
                <p>Color: {pet.color}</p>
                <p>Coat: {pet.coat}</p>
                <p>Size: {pet.size}</p>
                <p>Neutered: {pet.neutered}</p>
                <p>
                  Date Found: {new Date(pet.date_found).toLocaleDateString()}
                </p>
                <p>
                  Adoptable From:{" "}
                  {new Date(pet.adoptable_from).toLocaleDateString()}
                </p>
                <p>Posted: {new Date(pet.posted).toLocaleDateString()}</p>
                <button onClick={() => handleEditClick(pet)}>Edit</button>
                <button onClick={() => handleDelete(pet._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pet;
