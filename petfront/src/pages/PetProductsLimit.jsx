import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const PetProductsLimit = () => {
  const [productData, setProductData] = useState([]);
  const [breedData, setBreedData] = useState([]);

  // Fetch product quantities
  const fetchQuantities = async () => {
    try {
      const response = await axios.get(`${apiUrl}/product-quantities`);
      const data = response.data; // Assuming data is an array of objects with name and quantity
      console.log(data);
      setProductData(data.quantities); // Set product quantities in state
    } catch (error) {
      console.error("Error fetching product quantities:", error);
    }
  };

  // Fetch breed counts
  const fetchBreedCount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/pet/countByBreed`);
      setBreedData(response.data); // Assuming response.data is an array with breed and count
    } catch (error) {
      console.error("Error fetching breed count:", error);
    }
  };

  useEffect(() => {
    fetchQuantities();
    fetchBreedCount();
  }, []);

  return (
    <div className="pet-products-limit-container">
      <h2 className="section-header">Pet Products Quantity Chart</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              <Label value="Product Name" offset={0} position="bottom" />
            </XAxis>
            <YAxis>
              <Label value="Quantity" angle={-90} position="left" />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-content">
        <p className="section-description">
          This chart shows the quantity of different pet food products
          available. Keep an eye on inventory levels to ensure that popular
          products remain well-stocked.
        </p>
      </div>

      <h2 className="section-header">Pet Breed Count Chart</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={breedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id">
              <Label value="Breed" offset={0} position="bottom" />
            </XAxis>
            <YAxis>
              <Label value="Count" angle={-90} position="left" />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-content">
        <p className="section-description">
          The pet breed count chart displays the number of pets available for
          each breed. This information helps in understanding breed popularity
          and ensuring appropriate stock for different breeds.
        </p>
      </div>

      <div className="note">
        <h3>Important Note:</h3>
        <p>
          Keeping track of both product quantities and pet breed counts is
          crucial for efficient management of inventory and ensuring a smooth
          business operation. Be sure to regularly update product and breed
          information to avoid shortages and customer dissatisfaction.
        </p>
      </div>
    </div>
  );
};

export default PetProductsLimit;
