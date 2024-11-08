import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const AddPet = () => {
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", petData.name);
    formData.append("breed", petData.breed);
    formData.append("age", petData.age);
    if (petData.image) {
      formData.append("image", petData.image);
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/pet/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Pet added successfully");
        setPetData({ name: "", breed: "", age: "", image: null });
      } else {
        alert("Error adding pet");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-pet-container">
      <h1 className="add-pet-heading">Add a New Pet</h1>
      <form className="add-pet-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding Pet..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AddPet;
