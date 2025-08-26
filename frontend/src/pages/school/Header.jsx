import React from 'react';
import { Bell, User } from 'lucide-react';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = ({ adminName = "School Admin" }) => {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo and Title */}
                <div className="header-left">
                    <div className="header-logo">
                        <img src={logo} width="40" height="40" alt="Logo" />
                    </div>
                    <div>
                        <h1 className="header-title">Zha Sustainability</h1>
                        <p className="header-subtitle">Practitioners Certifications</p>
                    </div>
                </div>

                {/* Right side - Notifications and Profile */}
                <div className="header-right">
                    {/* Notification Bell */}
                    <div className="notification-container">
                        <Bell className="notification-bell" />
                        <span className="notification-badge">2</span>
                    </div>

                    {/* Profile Section */}
                    <div className="profile-section">
                        <div className="profile-avatar">
                            <User />
                        </div>
                        <span className="profile-name">{adminName}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;