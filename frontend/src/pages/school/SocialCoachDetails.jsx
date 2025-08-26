import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../../components/Sidebar";
import SocialLoginDetails from "./SocialLoginDetails";
import './SocialCoachDetails.css';

const SocialCoachDetails = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="coach-details-page App">
      {/* ✅ Header */}
      <Header adminName="School Admin" />

      <div className="app-body">
        {/* ✅ Sidebar */}
        <Sidebar activeItem="Social coach management" />

        {/* ✅ Main content */}
        <main className="main-content">
          <div className="main-profile">
            <div className="coach-details-container">
              <h2 className="details-title">Coach Details</h2>

              <form className="coach-details-form">
                <h3 className="details-section-title">Basic Info</h3>
                <hr />
                <div className="details-form-grid">
                  <div>
                    <label>School Name</label>
                    <input type="text" value="ABC School" disabled />
                  </div>
                  <div>
                    <label>School Code</label>
                    <input type="text" value="SCH-2024-001" disabled />
                  </div>
                  <div>
                    <label>First Name</label>
                    <input type="text" value="Akash" disabled />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input type="text" value="H" disabled />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" value="akashsvs@gmail.com" disabled />
                  </div>
                  <div>
                    <label>Joining Date</label>
                    <input type="date" value="2024-06-15" disabled />
                  </div>
                  <div>
                    <label>Password</label>
                    <input type="password" value="123456" disabled />
                  </div>
                  <div>
                    <label>Confirm Password</label>
                    <input type="confirm password" value="123456" disabled />
                  </div>
                  <div>
                    <label>Gender</label>
                    <input type="text" value="Male" disabled />
                  </div>
                  <div>
                    <label>Mobile Number</label>
                    <input type="text" value="9458795215" disabled />
                  </div>
                  <div>
                    <label>Designation</label>
                    <input type="text" value="Teacher" disabled />
                  </div>
                  <div>
                    <label>Department</label>
                    <input type="text" value="Tamil" disabled />
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <input type="date" value="1990-05-10" disabled />
                  </div>
                  <div>
                    <label>Blood Group</label>
                    <input type="text" value="O+" disabled />
                  </div>
                  <div>
                    <label>Status</label>
                    <input type="text" value="Active" disabled />
                  </div>
                </div>

                <div className="details-address-field">
                  <label>Address</label>
                  <textarea value="123, Anna Nagar, Chennai" disabled></textarea>
                </div>

                <div className="details-form-buttons">
                  <button
                    type="button"
                    className="details-btn-back"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>

                  {/* ✅ Login button */}
                  <button
                    type="button"
                    className="details-btn-back"
                    onClick={() => setShowLogin(true)}
                    style={{ backgroundColor: 'blue', color: 'white' }}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* ✅ Popup */}
      {showLogin && (
        <SocialLoginDetails onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default SocialCoachDetails;
