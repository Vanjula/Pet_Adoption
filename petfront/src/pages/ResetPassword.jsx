import React, { useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL ;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(""); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/user/reset-password`, {
        newPassword,
        token,
      });
      alert("Password reset successfully!");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/user/verify-otp`,
        {
          OTP: otp,
          token,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      <form className="otp-form" onSubmit={handleOtpSubmit}>
        <input
          className="otp-input"
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button className="otp-button" type="submit">
          Verify OTP
        </button>
      </form>
      <form className="password-form" onSubmit={handleSubmit}>
        <input
          className="password-input"
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="password-button" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
