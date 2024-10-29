import React, { useState, useEffect } from "react";
import axios from "axios";
import PetSearch from "./PetSearch";
import Shape from "../assets/Shape.svg";
import Bird from "../assets/bird.png";
import Vector from "../assets/Vector.svg";
import dog_img from "../assets/dog_img.png";
import Footer from "./Footer";
import Header from "./Header";
import Placeimg from "https://via.placeholder.com/60";
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
      <div className="HomeBody">
        <div className="Homeleft">
          <img src={Shape} alt="background" className="BackGroundShape" />
          <img src={Bird} alt="" className="BackGroundBird" />
          <img src={Shape} alt="background2" className="BackGroundShape2" />
          <div className="HomeContents">
            <p className="p_color">Pet Dabang</p>

            <div className="HomeContents_h">
              <h1>A pet store with </h1>
              <h1>everything you need</h1>
            </div>
            <div className="HomeContents_p">
              <p>
                Sociis blandit et pellentesque aliquet at quisque tortor lacinia
              </p>
              <p>nullam. Mattis aenean scelerisque dui libero</p>
            </div>
            {
              <button
                className="Adopt-btn"
                onClick={() => (window.location.href = "/Category")}
              >
                Start
              </button>
            }
          </div>
        </div>
        <div className="HomeRight">
          <img src={Vector} alt="" className="BackGround" />
          <img src={dog_img} alt="" className="DogImg" />
        </div>
      </div>
      <h2 className="adoption-title">Adopt a Pet</h2>

      {/* Pet Search */}
      <PetSearch onResults={setSearchResults} />

      {/* Display Search Results */}
      <div className="pet-results">
        {searchResults.length > 0 ? (
          searchResults.map((pet) => (
            <div key={pet._id} className="pet-card">
              {/* Pet Image */}
             

              <h3 className="pet-name">
                {pet.name} - {pet.breed}
              </h3>
              <p className="pet-type">Type: {pet.type}</p>
              <p className="pet-area">Area: {pet.area}</p>
              <p className="pet-age">Age: {pet.age} months</p>
              <p className="pet-contact">
                Contact: {pet.email}, {pet.phone}
              </p>
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
