import React, { useState } from "react";

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
      const response = await fetch("http://localhost:5000/pet/add", {
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
    <div className="AddPet">
      <h1>Add a New Pet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={petData.breed}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={petData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Pet Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding Pet..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AddPet;
