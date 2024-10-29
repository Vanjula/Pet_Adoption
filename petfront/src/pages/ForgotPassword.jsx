// src/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/forgot-password",
        { email }
      );
      alert(`OTP sent to ${email}. Please check your inbox.`);
      navigate("/reset-password"); // Navigate to reset-password route
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2 className="forgot-password-title">Forgot Password</h2>
        <input
          className="forgot-password-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="forgot-password-button" type="submit">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
