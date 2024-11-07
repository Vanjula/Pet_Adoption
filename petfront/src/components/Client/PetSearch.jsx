// PetSearch.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PetSearch = ({ onResults }) => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    breed: "",
    area: "",
    type: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch search results when search parameters change
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pet/search", {
          params: searchParams,
        });
        onResults(response.data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Debounce the search request by waiting 300ms after the user stops typing
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, onResults]);

  return (
    <div className="PetSearch">
      <h3>Search for Pets</h3>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Pet ID"
          value={searchParams.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={searchParams.breed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="area"
          placeholder="Area"
          value={searchParams.area}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={searchParams.type}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default PetSearch;
