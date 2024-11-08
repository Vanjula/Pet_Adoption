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

const initialData = [
  { name: "Product 1", quantity: 0 },
  { name: "Product 2", quantity: 0 },
  { name: "Product 3", quantity: 0 },
  { name: "Product 4", quantity: 0 },
  { name: "Product 5", quantity: 0 },
];

const PetProductsLimit = () => {
  const [productData, setProductData] = useState(initialData);
  const [breedData, setBreedData] = useState([]);

  const fetchQuantities = async () => {
    try {
      const response = await axios.get(`${apiUrl}/PetFood/quantity`);
      const { quantities } = response.data;
      setProductData(quantities);
    } catch (error) {
      console.error("Error fetching product quantities:", error);
    }
  };

  const fetchBreedCount = async () => {
    try {
      const response = await axios.get(`${apiUrl}/pet/countByBreed`);
      setBreedData(response.data);
    } catch (error) {
      console.error("Error fetching breed count:", error);
    }
  };

  useEffect(() => {
    fetchQuantities();
    fetchBreedCount();
  }, []);

  return (
    <div className="PetProductsLimit" style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "1.5em" }}>
        Pet Products Quantity Chart
      </h2>
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

      <h2 style={{ textAlign: "center", fontSize: "1.5em", marginTop: "40px" }}>
        Pet Breed Count Chart
      </h2>
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
  );
};

export default PetProductsLimit;
