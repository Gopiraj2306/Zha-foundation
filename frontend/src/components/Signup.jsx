import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./signup.css"; // use new css
import plantImage from "../assets/plants.png";
import logo from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    type: "Traditional",
    name: "",
    mobile_no: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log("Signup Success:", res.data);
       localStorage.setItem("token", res.data.token);

      // ✅ After signup → go directly to SchoolRegistrationForm
      navigate("/signup/schoolregistrationform");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side - Image */}
      <div className="login-left">
        <img src={plantImage} alt="Login Visual" className="login-image" />
      </div>

      {/* Right Side - Form */}
      <div className="signup-right" style={{ width:" 1174px"}}>
        <div className="signup-content">
          <img src={logo} alt="Logo" className="signup-logo" />
          <h2 className="signup-title">
            ZHA Sustainability Practitioners Certifications Club
          </h2>
          <p className="signup-subtitle">
            Professional Mentoring Young Generation
          </p>
          <h3 className="signup-heading">Signup</h3>

          <form onSubmit={handleSubmit}>
            {/* Role */}
            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Choose your role</option>
                <option value="Governor">Governor</option>
                <option value="School Admin">School</option>
                <option value="Social Coach">Social Coach</option>
              </select>
            </div>

            {/* Type */}
            <div className="form-group">
              <label>Type</label>
              <div className="type-toggle" >
                <label className="radio" style={{border: "1px solid #ddd", padding: "0 5px", borderRadius: "10px"}}>
                  <input
                    type="radio"
                    name="type"
                    value="Traditional"
                    checked={formData.type === "Traditional"}
                    onChange={handleChange}
                    style={{ marginTop: "15px" }}
                  />
                  Traditional
                </label>
                <label className="radio" style={{border: "1px solid #ddd", padding: "0 5px", borderRadius: "10px"}}>
                  <input
                    type="radio"
                    name="type"
                    value="Competitional"
                    checked={formData.type === "Competitional"}
                    onChange={handleChange}
                    style={{ marginTop: "15px"}}
                  />
                  Competitional
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="mobile_no"
                value={formData.mobile_no}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="form-input"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="form-input"
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <div className="divider">or</div>
          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
