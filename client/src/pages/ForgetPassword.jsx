import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/forgotpassword", { email });
      console.log('response msg', response)
      setMessage("Password reset link sent to your email!");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>

       
        {message && <p className="text-success text-center mt-3">{message}</p>}
        {error && <p className="text-danger text-center mt-3">{error}</p>}

        <div className="text-center mt-3">
          <p>Remember your password? <a onClick={() => navigate("/login")} href="#">Back to Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
