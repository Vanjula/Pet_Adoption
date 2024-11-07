import React, { useEffect, useState } from "react";
import dog_food from "../components/assets/placeholder.png"; // Assuming the image path is correct

const PetFood = () => {
  const [petsProducts, setPetsProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/PetFood/all")
      .then((response) => response.json())
      .then((data) => {
        setPetsProducts(data.PetFood);
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

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete product with ID:", id);
    // Add your delete logic here
  };

  return (
    <div className="Adminpet">
      <h1>List of Pet Food Products</h1>
      <ul>
        {petsProducts.map((food) => (
          <li key={food._id} className="pet-item">
            <h3>{food.name}</h3>
            <img src={dog_food} alt={food.name} />
            <p>Quantity: {food.qty}</p>
            <p>Price: ${food.price}</p>

            <div className="pet-buttons">
              <button onClick={() => handleEdit(food._id)} className="edit-btn">
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
    </div>
  );
};

export default PetFood;
