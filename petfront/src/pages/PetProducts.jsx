import React, { useEffect, useState } from "react";
import dog_food from "../components/assets/placeholder.png"; // Assuming the image path is correct
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL ;

const PetFood = () => {
  const [petsProducts, setPetsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    qty: "",
    price: "",
  });

  useEffect(() => {
    fetch(`${apiUrl}/PetFood/all`)
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

  const handleEditClick = (food) => {
    setEditingProductId(food._id);
    setEditFormData({ name: food.name, qty: food.qty, price: food.price });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/PetFood/edit/${editingProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("Edit successful:", data);
        setPetsProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId
              ? { ...product, ...editFormData }
              : product
          )
        );
        setEditingProductId(null); 
      } else {
        console.error("Edit failed:", data.error);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/PetFood/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Delete successful:", data);
        setPetsProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="Adminpet">
      <h1>List of Pet Food Products</h1>
      <ul>
        {petsProducts.map((food) => (
          <li key={food._id} className="pet-item">
            {editingProductId === food._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="qty"
                  value={editFormData.qty}
                  onChange={handleEditChange}
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingProductId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{food.name}</h3>
                <img src={`${apiUrl}${food.image}`} alt={food.name} />
                <p>Quantity: {food.qty}</p>
                <p>Price: ${food.price}</p>
                <div className="pet-buttons">
                  <button
                    onClick={() => handleEditClick(food)}
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
              </>
            )}
          </li>
        ))}
        <div className="Adminpet">
          <Link to="add-pet-food">Add New Pet Food</Link>{" "}
        </div>
      </ul>
    </div>
  );
};

export default PetFood;
