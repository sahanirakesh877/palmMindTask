import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
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
      const response = await axios.post("http://localhost:5000/api/v1/register", formData);
     
      setMessage("Registration successful!");
      toast.success("Registration successful!");

      setFormData({ name: "", email: "", phone: "", password: "" });
      setError("");

      navigate('/login');
      
    } catch (err) {
      setMessage("");
      toast.error("Registration failed. Please try again.");
      setError("Registration failed. Please try again.");
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
          <h3 className="text-center mb-2">User Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
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
              Register
            </button>
          </form>
          {message && <p className="text-success text-center mt-3">{message}</p>}
          {error && <p className="text-danger text-center mt-3">{error}</p>}

          <div className="text-center mt-2 d-flex justify-content-center align-items-center gap-2">
            <p className="mb-0">Already registered?</p>
            <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
