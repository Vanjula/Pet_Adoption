import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Adminpet = () => {
  const [petsProducts, setPetsProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for feedback
  const [editFormData, setEditFormData] = useState({
    name: "",
    breed: "",
    age: "",
    sex: "",
    color: "",
    coat: "",
    size: "",
    neutered: "",
    date_found: "",
    adoptable_from: "",
    posted: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch pet products when the component mounts
  useEffect(() => {
    fetchPetProducts();
    // Retrieve saved form data from localStorage on page load
    const savedFormData = JSON.parse(localStorage.getItem("editFormData"));
    if (savedFormData) {
      setEditFormData(savedFormData);
    }
  }, []);

  const fetchPetProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/PetFood/all`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setPetsProducts(data.petProducts || []); // Ensure data is an array
    } catch (error) {
      console.error("Error fetching pet products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in form fields and save them to localStorage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...editFormData, [name]: value };
    setEditFormData(updatedData);
    localStorage.setItem("editFormData", JSON.stringify(updatedData)); // Store in localStorage
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData((prevData) => {
        const updatedData = { ...prevData, image: file };
        localStorage.setItem("editFormData", JSON.stringify(updatedData)); // Store image in localStorage
        return updatedData;
      });
    }
  };

  const handleEdit = (productId) => {
    const product = petsProducts.find((p) => p._id === productId);
    if (product) {
      setEditFormData({
        name: product.name,
        breed: product.breed,
        age: product.age,
        sex: product.sex,
        color: product.color,
        coat: product.coat,
        size: product.size,
        neutered: product.neutered,
        date_found: product.date_found,
        adoptable_from: product.adoptable_from,
        posted: product.posted,
        image: product.image,
      });
      setSelectedProduct(product); // Ensure selected product is set
      setIsEditing(true);
    }
  };

 const handleSaveEdit = async (productId) => {
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
     const response = await fetch(
       `${process.env.REACT_APP_API_URL}/PetFood/update/${productId}`,
       {
         method: "PUT",
         body: formData,
       }
     );
     const result = await response.json();
     if (response.ok) {
       // Update the state to reflect the changes
       setPetsProducts((prev) =>
         prev.map((product) =>
           product._id === productId
             ? {
                 ...product,
                 ...editFormData,
                 image: result.updatedImage || product.image,
               }
             : product
         )
       );
       setIsEditing(false);
       alert(result.message);
       localStorage.removeItem("editFormData"); // Clear saved form data after successful update
     } else {
       alert(result.error || "Error updating product");
     }
   } catch (error) {
     console.error("Error updating pet product:", error);
     alert("Failed to update pet product.");
   }
 };


  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/PetFood/delete/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (response.ok) {
        setPetsProducts((prev) => prev.filter((product) => product._id !== id));
        alert(result.message);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error deleting pet product:", error);
      alert("Failed to delete pet product.");
    }
  };

  const handleSelectProduct = (product) => setSelectedProduct(product);

  return (
    <div className="admin-pet-container">
      <h1 className="admin-pet-header">List of Pet Food Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : petsProducts.length > 0 ? (
        <ul className="pet-product-list">
          {petsProducts.map((food) => (
            <li key={food._id} className="pet-item-card">
              <h3 className="pet-item-name">{food.name}</h3>
              <img
                src={`${process.env.REACT_APP_API_URL}${food.image}`}
                alt={food.name}
                className="pet-item-image"
                onClick={() => handleSelectProduct(food)}
              />
              <p className="pet-item-quantity">Quantity: {food.qty}</p>
              <p className="pet-item-price">Price: ${food.price}</p>
              <p className="pet-item-category">Category: {food.category}</p>

              <div className="pet-item-buttons">
                <button
                  onClick={() => handleEdit(food._id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}

      {isEditing && selectedProduct && (
        <div className="edit-form-container">
          <h2>Edit Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(selectedProduct._id);
            }}
          >
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Breed:
              <input
                type="text"
                name="breed"
                value={editFormData.breed}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={editFormData.age}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Sex:
              <input
                type="text"
                name="sex"
                value={editFormData.sex}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                name="color"
                value={editFormData.color}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Coat:
              <input
                type="text"
                name="coat"
                value={editFormData.coat}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Size:
              <input
                type="text"
                name="size"
                value={editFormData.size}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Neutered:
              <input
                type="text"
                name="neutered"
                value={editFormData.neutered}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Date Found:
              <input
                type="date"
                name="date_found"
                value={editFormData.date_found}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Adoptable From:
              <input
                type="text"
                name="adoptable_from"
                value={editFormData.adoptable_from}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Posted:
              <input
                type="date"
                name="posted"
                value={editFormData.posted}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image:
              <input type="file" name="image" onChange={handleImageChange} />
            </label>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Adminpet;
