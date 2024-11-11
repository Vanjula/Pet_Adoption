import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const AddPet = () => {
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    sex: "",
    color: "",
    size: "",
    coat: "",
    neutered: "",
    image: null,
    date_found: "",
    adoptable_from: "",
    posted: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append all form fields
    Object.keys(petData).forEach((key) => {
      if (key === "image" && petData[key]) {
        formData.append(key, petData[key]);
      } else if (key !== "image") {
        formData.append(key, petData[key]);
      }
    });

    setLoading(true); // Show loading indicator

    try {
      const response = await fetch(`${apiUrl}/pet/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Pet added successfully");
        setPetData({
          name: "",
          breed: "",
          age: "",
          sex: "",
          color: "",
          size: "",
          coat: "",
          neutered: "",
          image: null,
          date_found: "",
          adoptable_from: "",
          posted: "",
        }); // Reset form
      } else {
        alert("Error adding pet");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Error adding pet");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="add-pet-container">
      <h1 className="add-pet-heading">Add a New Pet</h1>
      <form className="add-pet-form" onSubmit={handleSubmit}>
        <div>
          {/* Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={petData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Breed */}
          <div className="form-group">
            <label className="form-label" htmlFor="breed">
              Breed:
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              value={petData.breed}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label className="form-label" htmlFor="age">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={petData.age}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Sex */}
          <div className="form-group">
            <label className="form-label" htmlFor="sex">
              Sex:
            </label>
            <select
              id="sex"
              name="sex"
              value={petData.sex}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Color */}
          <div className="form-group">
            <label className="form-label" htmlFor="color">
              Color:
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={petData.color}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Size */}
          <div className="form-group">
            <label className="form-label" htmlFor="size">
              Size:
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={petData.size}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        </div>
        <div>
          {/* Coat */}
          <div className="form-group">
            <label className="form-label" htmlFor="coat">
              Coat:
            </label>
            <input
              type="text"
              id="coat"
              name="coat"
              value={petData.coat}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Neutered */}
          <div className="form-group">
            <label className="form-label" htmlFor="neutered">
              Neutered:
            </label>
            <select
              id="neutered"
              name="neutered"
              value={petData.neutered}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="">Select Neutered Status</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Date Found */}
          <div className="form-group">
            <label className="form-label" htmlFor="date_found">
              Date Found:
            </label>
            <input
              type="date"
              id="date_found"
              name="date_found"
              value={petData.date_found}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Adoptable From */}
          <div className="form-group">
            <label className="form-label" htmlFor="adoptable_from">
              Adoptable From:
            </label>
            <input
              type="date"
              id="adoptable_from"
              name="adoptable_from"
              value={petData.adoptable_from}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Posted */}
          <div className="form-group">
            <label className="form-label" htmlFor="posted">
              Posted On:
            </label>
            <input
              type="date"
              id="posted"
              name="posted"
              value={petData.posted}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          {/* Image */}
          <div className="form-group">
            <label className="form-label" htmlFor="image">
              Pet Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding Pet..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AddPet;
