
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(`${apiUrl}/user/forgot-password`, {
        email,
      });
      alert(`OTP sent to ${email}. Please check your inbox.`);
      navigate("/reset-password"); 
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "An error occurred");
      } else {
        alert("Network error. Please try again later.");
      }
    } finally {
      setLoading(false); 
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
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="forgot-password-button"
          type="submit"
          disabled={loading} 
        >
          {loading ? "Sending OTP..." : "Send OTP"} {/* Show loading text */}

        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
