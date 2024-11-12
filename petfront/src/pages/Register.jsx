

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });

  // Navigation hook
  const navigate = useNavigate();

  // Handle input change and update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/user/register`, formData);

      // Check if response contains success message
      if (response.data && response.data.success) {
        alert(response.data.success);
        navigate("/"); // Redirect to home page after successful registration
      } else {
        alert("Registration successful, but no success message was received.");
      }
    } catch (error) {
      // Handle errors from the backend
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-image"></div> {/* Side image */}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>

        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;