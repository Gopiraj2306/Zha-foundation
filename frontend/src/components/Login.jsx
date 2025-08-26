import React, { useState } from 'react';
import './login.css';
import plantImage from '../assets/plants.png';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login attempt with:', { email, password });
    };

      const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/school-profile"); // direct navigate
  };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={plantImage} alt="Login Visual" />
            </div>
            <div className="login-form">
                <div className="form-content">
                    {/* <div className="logo"> */}
                    <img src={logo} alt="Logo" width="60" height="60" style={{ marginLeft: '175px' }} />
                    {/* </div> */}
                    <h2>ZHA Sustainability Practitioners Certifications Club</h2>
                    <p>Professional Mentoring Young Generation</p>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter your email address" />
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                        <div className="forgot-password">Forgot Password?</div>
                        <button type="submit">Login</button>
                    </form>
                    <div className="or-separator">
                        <hr />
                        <span>or</span>
                        <hr />
                    </div>
                    <p className="signup-text">New Registration? <Link to="/signup">Signup</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;