import React from 'react';
import { Edit3, Users, Building, Eye, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from '../../components/Sidebar';
import './SchoolProfile.css';

const SchoolProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      {/* Header */}
      <Header adminName="School Admin" />

      {/* Body: Sidebar + Main content */}
      <div className="app-body">
        <Sidebar activeItem="School management" />

        <main className="main-content">
          <div className="school-profile">

            {/* Profile Header */}
            <div className="profile-header">
              <div className="profile-header-content">
                <h1 className="profile-title">School Profile</h1>
                <button
                  className="edit-button"
                  onClick={() => navigate("/edit-profile")} 
                  style={{marginBottom:'-13px'}}
                >
                  <Edit3 />
                  <span >Edit Profile</span>
                </button>
              </div>
            </div>

            <div className="profile-wrapper">
              <div className="capacity-card">
        
                 <div className="capacity">
    <div className="capacity-header">
       <Users /> Total Capacity
    </div>
    <div className="capacity-value">1,200 Students</div>
  </div>
              </div>

              {/* School Information Card */}
              <div className="info-card">
                <div className="info-header">
                  <div className="info-title-section">
                    <div className="info-icon">
                      <Building />
                    </div>
                    <h3 className="info-title">School Information</h3>
                  </div>
                  <div className="approved-badge green">
                    <CheckCircle />
                    <span className="approved-text">Approved</span>
                  </div>
                </div>
                <div className="school-info">
                  <div className="school-detail">
                    <p className="school-label">School Name</p>
                    <p className="school-value">ABC High School</p>
                  </div>
                  <div className="school-detail">
                    <p className="school-label">School Code</p>
                    <p className="school-value">SCH-2024-001</p>
                  </div>
                </div>
              </div>

              {/* Vision Section */}
              <div className="vision-card">
                <div className="vision-header">
                  <div className="vision-icon">
                    <Eye />
                  </div>
                  <h3 className="vision-title">Vision</h3>
                </div>
                <p className="vision-text">
                  To be a leading educational institution that nurtures innovative thinking,
                  character development, and academic excellence while preparing students
                  for global citizenship and lifelong learning.
                </p>
              </div>
              <div className="vision-card">
                <div className="vision-header">
                  <div className="vision-icon">
                    <Eye />
                  </div>
                  <h3 className="vision-title">Mission</h3>
                </div>
                <p className="vision-text">
                  To be a leading educational institution that nurtures innovative thinking,
                  character development, and academic excellence while preparing students
                  for global citizenship and lifelong learning.
                </p>
              </div>
              <div className="vision-card">
                <div className="vision-header">
                  <div className="vision-icon">
                    <Eye />
                  </div>
                  <h3 className="vision-title">Infrastructure Details</h3>
                </div>
                <p className="vision-text">
                  To be a leading educational institution that nurtures innovative thinking,
                  character development, and academic excellence while preparing students
                  for global citizenship and lifelong learning.
                </p>
              </div>
            </div>
          </div >
        </main>
      </div>
    </div>

  );
};

export default SchoolProfile;
