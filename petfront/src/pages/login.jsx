// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:5000/user/login",
      credentials
    );
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    navigate("/");
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // Server responded with a status code other than 2xx
      alert(error.response.data.error || "An error occurred.");
    } else if (error.request) {
      // Request was made but no response received
      alert("No response from the server. Please try again later.");
    } else {
      // Something happened in setting up the request
      alert("Error: " + error.message);
    }
  }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
        <div className="login-options">
          <a href="/forgot-password" className="login-option">
            Forgot Password?
          </a>
          <span className="login-separator">|</span>
          <a href="/register" className="login-option">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
