import React, { useState, useEffect } from "react";
import axios from "axios";
import PetSearch from "./PetSearch";
import Bird from "../assets/bird.png";
import dog_img from "../assets/Fish.png";
import placeholder from "../assets/placeholder.png";
import Footer from "./Footer";
import Header from "./Header";

const apiUrl = process.env.REACT_APP_API_URL;

const Adoption = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    type: "",
    age: "",
    area: "",
    contactEmail: "",
    contactPhone: "",
    image: null,
  });

  useEffect(() => {
    const fetchDefaultPets = async () => {
      try {
        const response = await axios.get(`${apiUrl}/pet/all`);
        setSearchResults(response.data.data || []);
      } catch (error) {
        console.error("Error fetching default pets:", error);
      }
    };
    fetchDefaultPets();
  }, []);

  const handleShowInterest = async (petId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${apiUrl}/request/add`,
        { pet: petId },
        { headers: { Authorization: `${token}` } }
      );
      if (response.status === 201) {
        alert("Adoption request created successfully!");
      }
    } catch (error) {
      console.error("Error creating adoption request:", error);
      alert("Failed to create adoption request.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPet((prevPet) => ({ ...prevPet, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewPet((prevPet) => ({ ...prevPet, image: e.target.files[0] }));
  };

  const handleSubmitPostPet = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    for (const key in newPet) {
      formData.append(key, newPet[key]);
    }

    try {
      const response = await axios.post(`${apiUrl}/pet/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        alert("Pet posted successfully!");
        setShowPostForm(false);
      }
    } catch (error) {
      console.error("Error posting pet:", error);
      alert("Failed to post pet.");
    }
  };

  return (
    <div className="adoption-container">
      <Header />
      <div className="hero-section">
        {/* Left Content - Text */}
        <div className="hero-text">
          <h1>Find Your New Best Friend</h1>
          <p>
            Explore a wide range of pets looking for a loving home. Adopt today
            and make a difference in their lives.
          </p>
          <button onClick={() => (window.location.href = "/Category")}>
            Start Your Journey
          </button>
        </div>

        {/* Background Images */}
        <img
          src={dog_img}
          alt="Decorative Shape"
          className="background-shape"
        />
        <img src={Bird} alt="Flying Bird" className="background-animal" />
      </div>

      <h2 className="adoption-title">Adopt a Pet</h2>

      {/* Pet Search */}
      <PetSearch onResults={setSearchResults} />

      {/* Display Search Results */}
      <div className="pet-results">
        {searchResults.length > 0 ? (
          searchResults.map((pet) => (
            <div key={pet._id} className="pet-card">
              <h3 className="pet-name">
                {pet.name} - {pet.breed}
              </h3>
              {pet.image ? (
                <img src={`${apiUrl}${pet.image}`} alt={pet.name} />
              ) : (
                <p>No image available</p>
              )}
              <p className="pet-type">Type: {pet.type || "N/A"}</p>
              <p className="pet-area">Area: {pet.area || "Unknown"}</p>
              <p className="pet-age">
                Age: {pet.age ? `${pet.age} months` : "N/A"}
              </p>
              <p className="pet-contact">
                Contact: {pet.email || "No email provided"},{" "}
                {pet.phone || "No phone provided"}
              </p>

              {/* Show Interest Button */}
              <button
                className="show-interest-button"
                onClick={() => handleShowInterest(pet._id)}
              >
                Adopt
              </button>
            </div>
          ))
        ) : (
          <p className="no-results-message">No results found.</p>
        )}
      </div>

      {/* Add Pet Button */}
      <div className="add-pet-btn-container">
        <button
          className="add-pet-button"
          onClick={() => setShowPostForm(!showPostForm)}
        >
          Post Your Pet for Adoption
        </button>
      </div>

      {/* Post Pet Form */}
      {showPostForm && (
        <div className="post-pet-form-container">
          <h2>Post a Pet for Adoption</h2>
          <form onSubmit={handleSubmitPostPet}>
            <input
              type="text"
              name="name"
              placeholder="Pet Name"
              value={newPet.name}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="breed"
              placeholder="Pet Breed"
              value={newPet.breed}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="type"
              placeholder="Pet Type"
              value={newPet.type}
              onChange={handleFormChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age (in months)"
              value={newPet.age}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={newPet.area}
              onChange={handleFormChange}
              required
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              value={newPet.contactEmail}
              onChange={handleFormChange}
              required
            />
            <input
              type="tel"
              name="contactPhone"
              placeholder="Contact Phone"
              value={newPet.contactPhone}
              onChange={handleFormChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <button type="submit" className="submit-pet-button">
              Post Pet for Adoption
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Adoption;
