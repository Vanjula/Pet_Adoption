import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const AddPetProduct = () => {
  const [petProductData, setPetProductData] = useState({
    name: "",
    qty: "",
    price: "",
    description: "",
    category: "Food", // Default category
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append all form fields
    Object.keys(petProductData).forEach((key) => {
      if (key === "image" && petProductData[key]) {
        formData.append(key, petProductData[key]);
      } else if (key !== "image") {
        formData.append(key, petProductData[key]);
      }
    });

    setLoading(true); // Show loading indicator

    try {
      const response = await fetch(`${apiUrl}/PetFood/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully");
        setPetProductData({
          name: "",
          qty: "",
          price: "",
          description: "",
          category: "Food",
          image: null,
        }); 
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="add-pet-container">
      <h1 className="add-pet-product-heading">Add a New Pet Product</h1>
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
              value={petProductData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label className="form-label" htmlFor="qty">
              Quantity:
            </label>
            <input
              type="number"
              id="qty"
              name="qty"
              value={petProductData.qty}
              onChange={handleInputChange}
              className="form-input"
              required
              min="1"
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={petProductData.price}
              onChange={handleInputChange}
              className="form-input"
              required
              min="0"
            />
          </div>
        </div>

        <div>
          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={petProductData.description}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={petProductData.category}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="Food">Food</option>
              <option value="Toys">Toys</option>
              <option value="Accessories">Accessories</option>
              <option value="Grooming">Grooming</option>
            </select>
          </div>

          {/* Image */}
          <div className="form-group">
            <label className="form-label" htmlFor="image">
              Product Image:
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
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddPetProduct;
