import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../../components/Sidebar";
import './SocialEditCoach.css';

const SocialEditCoach = () => {
  const navigate = useNavigate();

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
              <h2 className="details-title">Edit Coach</h2>

              <form className="coach-details-form">
                <h3 className="details-section-title">Basic Info</h3>
                <hr />
                <div className="details-form-grid">
                <div>
                    <label>School Name</label>
                    <input type="text" value="" placeholder="Enter School Name"/>
                  </div>
                  <div>
                    <label>School Code</label>
                    <input type="text" value="SCH-2024-001" disabled />
                  </div>
                  <div>
                    <label>First Name</label>
                    <input type="text" value="" placeholder="Enter First Name" />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input type="text" value="" placeholder="Enter Last Name"/>
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" value="" placeholder="Enter Email" />
                  </div>
                  <div>
                    <label>Joining Date</label>
                    <input type="date" value="" placeholder="Enter Joining Date"/>
                  </div>
                  <div>
                    <label>Password</label>
                    <input type="password" value="" placeholder="Enter Password"/>
                  </div>
                  <div>
                    <label>Confirm Password</label>
                    <input type="confirm password" value="" placeholder="Enter Confirm Password" />
                  </div>
                  <div>
                    <label>Gender</label>
                    <input type="text" value="Male" placeholder=""/>
                  </div>
                  <div>
                    <label>Mobile Number</label>
                    <input type="number" value="" placeholder="Enter Mobile Number" />
                  </div>
                  <div>
                    <label>Designation</label>
                    <input type="text" value="" placeholder="Enter Designation"/>
                  </div>
                  <div>
                    <label>Department</label>
                    <input type="text" value="" placeholder="Enter Department"/>
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <input type="date" value="" />
                  </div>
                  <div>
                    <label>Blood Group</label>
                   <input type="text" value="" />
                  </div>
                  <div>
                    <label>Status</label>
                    <input type="text" value="" placeholder="Enter Status"/>
                  </div>
                </div>

                <div className="details-address-field">
                  <label>Address</label>
                  <textarea value="" placeholder="Enter Address"></textarea>
                </div>

                <div className="details-form-buttons">
                 <button type="button" className="edit-btn-save">Save Changes</button>
                  <button type="button" className="details-btn-back" onClick={() => navigate(-1)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SocialEditCoach;
