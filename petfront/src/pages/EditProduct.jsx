import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/PetFood/find/${productId}`
      );
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      setProduct(data.petProduct);
      setImagePreview(
        `${process.env.REACT_APP_API_URL}${data.petProduct.image}`
      );
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({
      ...prev,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file)); // Preview the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("qty", product.qty);
    formData.append("category", product.category);
    if (product.image) formData.append("image", product.image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/PetFood/update/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        navigate("/admin-pet"); // Navigate back to the admin product list
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-product-container">
      <h1>Edit Pet Food Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="qty"
            value={product.qty}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
