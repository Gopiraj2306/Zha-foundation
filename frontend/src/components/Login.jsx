import React, { useState } from 'react'; 
import './login.css';
import plantImage from '../assets/plants.png';
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // 🔑 save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Login success:", res.data);

      // redirect after login
      navigate("/school-profile");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Image */}
      <div className="login-left">
        <img src={plantImage} alt="Login Visual" className="login-image" />
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <div className="login-content">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2 className="login-title">
            ZHA Sustainability Practitioners Certifications Club
          </h2>
          <p className="login-subtitle">Professional Mentoring Young Generation</p>
          <h3 className="login-heading">Login</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="forgot-password">Forgot Password?</div>

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="divider">or</div>

          <p className="signup-text">
            New Registration? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
