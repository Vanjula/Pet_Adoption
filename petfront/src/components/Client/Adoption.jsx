import React, { useState, useEffect } from "react";
import axios from "axios";
import PetSearch from "./PetSearch";
import Shape from "../assets/Shape.svg";
import Bird from "../assets/bird.png";
import Vector from "../assets/Vector.svg";
import dog_img from "../assets/dog_img.png";
import placeholder from "../assets/placeholder.png";
import Footer from "./Footer";
import Header from "./Header";
const Adoption = () => {
  const [searchResults, setSearchResults] = useState([]);

  // Fetch default pets when component mounts
  useEffect(() => {
    const fetchDefaultPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pet/all");
        setSearchResults(response.data.data || []);
      } catch (error) {
        console.error("Error fetching default pets:", error);
      }
    };
    fetchDefaultPets();
  }, []);

  // Handle Show Interest button click
  const handleShowInterest = async (petId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/request/add",
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
        <img src={Shape} alt="Decorative Shape" className="background-shape" />
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
              <img src={placeholder} alt="" />
              <p className="pet-type">Type: {pet.type}</p>
              <p className="pet-area">Area: {pet.area}</p>
              <p className="pet-age">Age: {pet.age} months</p>
              <p className="pet-contact">
                Contact: {pet.email}, {pet.phone}
              </p>

              {/* Show Interest Button */}
              <button
                className="show-interest-button"
                onClick={() => handleShowInterest(pet._id)}
              >
                Show Interest
              </button>
            </div>
          ))
        ) : (
          <p className="no-results-message">No results found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Adoption;
