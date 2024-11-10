import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        formData
      );

      const { token, userID } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userID", userID);

        toast.success("Login successful!");
        setMessage("Login successful!");
        setError("");

        navigate("/");

      } else {
        toast.error("Login failed. Please check your credentials.");
        setError("Login failed. Please try again.");
        setMessage("");
      }

    } catch (err) {
      toast.error("Login failed. Please try again.");
      setMessage("");
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center pt-5">
        <div
          className="card shadow-lg p-4"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h3 className="text-center mb-2">User Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {message && (
            <p className="text-success text-center mt-3">{message}</p>
          )}
          {error && <p className="text-danger text-center mt-3">{error}</p>}

          <div className="text-center mt-2 d-flex justify-content-center align-items-center gap-2">
            <p className="mb-0">Don't have an account?</p>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
