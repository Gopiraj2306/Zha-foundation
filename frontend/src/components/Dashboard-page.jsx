import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import logo from '../assets/logo.png';

const useAnimatedCounter = (endValue, duration = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 16);
    const interval = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        clearInterval(interval);
        setValue(endValue);
      } else {
        setValue(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [endValue, duration]);

  return value;
};

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('All Certifications');
  const [searchTerm, setSearchTerm] = useState('');

  const totalPoints = useAnimatedCounter(40);
  const totalBadges = useAnimatedCounter(6);
  const currentRank = '3rd';

  const certificationData = [
    { id: 1, certification: 'White Hat', maturityLevel: '01', badges: 'Silver badge', points: '18/25', status: 'Completed' },
    { id: 2, certification: 'Blue Hat', maturityLevel: '02', badges: 'Gold badge', points: '23/25', status: 'Completed' },
    { id: 3, certification: 'Orange Hat', maturityLevel: '03', badges: '-', points: '-', status: 'Pending' },
    { id: 4, certification: 'Green Hat', maturityLevel: '04', badges: '-', points: '-', status: 'Pending' },
    { id: 5, certification: 'White Hat', maturityLevel: '01', badges: 'Gold badge', points: '23/25', status: 'Completed' }
  ];

  const notifications = [
    { icon: '🏆', title: '"Plastic-Free Week" is now live. Complete it by July 30 to earn 10 bonus points!', subtitle: 'New Mission Alert!' },
    { icon: '🏆', title: 'rankings have been refreshed. Check your score and keep up the great work!', subtitle: 'Leaderboard Update' },
    { icon: '🏆', title: 'Record your eco-speech and submit by August 15 to be featured in the next episode!', subtitle: 'ZED Talk Submission Open' },
    { icon: '🏆', title: 'Record your eco-speech and submit by August 15 to be featured in the next episode!', subtitle: 'ZED Talk Submission Open' }
  ];

  const sidebarItems = [
    { icon: '🏠', text: 'Dashboard', active: true },
    // { icon: '🎓', text: 'My Certifications' },
    // { icon: '📈', text: 'Habit Tracker' },
    // { icon: '🎤', text: 'ZED Talks' },
    // { icon: '🏆', text: 'ZED Expo' },
    // { icon: '📊', text: 'Leaderboard' },
    // { icon: '📋', text: 'Reports' },
    // { icon: '🎪', text: 'Virtual Events' },
    // { icon: '⚙️', text: 'Settings' },
  ];

  const tabs = ['All Certifications', 'Pending Certification', 'Completed Certification'];

  const getFilteredData = () => {
    switch (activeTab) {
      case 'Pending Certification':
        return certificationData.filter(item => item.status === 'Pending');
      case 'Completed Certification':
        return certificationData.filter(item => item.status === 'Completed');
      default:
        return certificationData;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="Logo" width="50" height="50" />
            <div className="logo-text">
              <div className="logo-title">Zha Sustainability</div>
              <div className="logo-subtitle">Practitioners Certifications</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.text}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Track your progress and achievements</p>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <div className="avatar">👤</div>
              <span className="username">Ram kumar</span>
            </div>
          </div>
        </div>

        <div className="welcome-section">
          <h2 className="welcome-title">Welcome back, Ram kumar!</h2>
          <p className="welcome-subtitle">Continue your learning journey and achieve your certification goals</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Current Certification</span>
              <div className="stat-icon blue">⚙️</div>
            </div>
            <div className="stat-content">
              <div className="progress-circle">
                <div className="progress-ring">
                  <svg className="progress-svg" width="80" height="80">
                    <circle cx="40" cy="40" r="35" stroke="#e6f3ff" strokeWidth="6" fill="none" />
                    <circle cx="40" cy="40" r="35" stroke="#2563eb" strokeWidth="6" fill="none"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.6)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className="progress-text">60%</div>
                </div>
              </div>
              <div className="stat-label">White Hat - In Progress</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Points Earned</span>
              <div className="stat-icon orange">⭐</div>
            </div>
            <div className="stat-content">
              <div className="stat-number orange">{totalPoints}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Badges Earned</span>
              <div className="stat-icon green">🏅</div>
            </div>
            <div className="stat-content">
              <div className="stat-number green">{totalBadges}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Current Rank</span>
              <div className="stat-icon cyan">📊</div>
            </div>
            <div className="stat-content">
              <div className="stat-number cyan">{currentRank}</div>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        <div className="content-grid">
          <div className="content-left">
            <div className="section-card">
              <div className="section-header">
                <div className="section-title-group">
                  <h3 className="section-title">Certification details</h3>
                  <p className="section-subtitle">View and manage your task and certification details</p>
                </div>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-button"></button>
                </div>
              </div>

              <div className="tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="table-container">
                <table className="certification-table">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>CERTIFICATION</th>
                      <th>MATURITY LEVEL</th>
                      <th>BADGES</th>
                      <th>POINTS</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredData().map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.certification}</td>
                        <td>{item.maturityLevel}</td>
                        <td>{item.badges}</td>
                        <td>{item.points}</td>
                        <td>
                          <span className={`status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="content-right">
            <div className="notifications-card">
              <h3 className="notifications-title">Notifications</h3>
              <div className="notifications-list">
                {notifications.map((notification, index) => (
                  <div key={index} className="notification-item">
                    <div className="notification-icon">{notification.icon}</div>
                    <div className="notification-content">
                      <p className="notification-text">{notification.title}</p>
                      <span className="notification-subtitle">{notification.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
