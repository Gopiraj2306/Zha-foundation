import React, { useState } from 'react';
import './login.css';
import plantImage from '../assets/plants.png';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [type, setType] = useState('Traditional');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login attempt with:', { email, password });
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <img src={plantImage} alt="Login Visual" />
            </div>
            <div className="login-form">
                <div className="form-content">
                    {/* <div className="logo"> */}
                    <img src={logo} alt="Logo" width="50" height="50" style={{ marginLeft: '175px',marginTop: '50px' }} />
                    {/* </div> */}
                    <h2 >ZHA Sustainability Practitioners Certifications Club</h2>
                    <p > Professional Mentoring Young Generation</p>
                    <h3 style={{ marginTop: '-10px' }}>Signup </h3>
                    <form>
                        <label htmlFor="role">Role</label>
                        <select id="role" className="dropdown">
                            <option value="">Choose your role</option>
                            <option value="Super Admin">Super Admin</option>
                                    <option value="Governor">Governor</option>
                                    <option value="School Admin">School Admin</option>
                                    <option value="Social Coach">Social Coach</option>
                                    <option value="Student">Student</option>
                        </select>
                            <label className="type-label">Type</label>
                            <div className="type-options" style={{ display: 'flex' }}>
                            <label className={`type-option ${type === 'Traditional' ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', marginRight: '20px',textAlign: 'center',border: '1px solid #ccc', borderRadius: '5px',padding: '0 5px 0 5px' }}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Traditional"
                                        checked={type === 'Traditional'}
                                        onChange={(e) => setType(e.target.value)}
                                        style ={{ marginTop: '12px', marginRight: '5px' }}
                                    />
                                    Traditional
                                </label>

                                <label className={`type-option ${type === 'Competitional' ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'center', marginRight: '20px',border: '1px solid #ccc', borderRadius: '5px',padding: '0 5px 0 5px' }}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Competitional"
                                        checked={type === 'Competitional'}
                                        onChange={(e) => setType(e.target.value)}
                                        style ={{ marginTop: '12px', marginRight: '5px' }}
                                    />
                                    Competitional
                                </label>
                            </div>
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter your email address" />
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" />
                        <div className="forgot-password">Forgot Password?</div>
                        <button style={{ marginBottom: '-10px' }} type="submit">Signup</button>
                    </form>
                    <div className="or-separator">
                        <hr />
                        <span>or</span>
                        <hr />
                    </div>
                    <p style={{ marginBottom: '-10px' }}className="signup-text">You have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;