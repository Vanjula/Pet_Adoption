import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const AddPetFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    qty: "",
    price: "",
  });
  const [image, setImage] = useState(null); // State for image file
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("qty", formData.qty);
    formDataObj.append("price", formData.price);
    if (image) {
      formDataObj.append("image", image); // Add the image file to FormData
    }

    try {
      const response = await fetch(`${apiUrl}/PetFood/add`, {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Pet food added successfully!");
        setFormData({ name: "", qty: "", price: "" });
        setImage(null);
      } else {
        setError(data.error || "Failed to add pet food");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error adding pet food:", error);
    }
  };

  return (
    <div className="AddPetFood">
      <h1>Add New Pet Food</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Add Pet Food</button>
      </form>
    </div>
  );
};

export default AddPetFood;
