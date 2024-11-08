import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(
        `${apiUrl}/user/login`,
        credentials
      );
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/"); 
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "An error occurred.");
      } else if (error.request) {
        alert("No response from the server. Please try again later.");
      } else {
        alert("Error: " + error.message);
      }
    } finally {
      setLoading(false); 
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
        <button
          className="login-button"
          type="submit"
          disabled={loading} 
        >
          {loading ? "Logging in..." : "Login"} 
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
