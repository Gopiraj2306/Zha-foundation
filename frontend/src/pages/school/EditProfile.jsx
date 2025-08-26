import React, { useState } from "react";

import Sidebar from "../../components/Sidebar";
import "./EditProfile.css";
import Header from "./Header";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    schoolName: "ABC High School",
    schoolCode: "ZHA12345",
    address: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    infrastructure: "",
    vision: "",
    mission: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    alert("Profile saved successfully!");
  };

  const handleCancel = () => {
    alert("Cancelled. Going back to profile page.");
  };

  return (
    <div className="App">
      <Header adminName="School Admin" />
      <div className="app-body">
        <Sidebar activeItem="School management" />

        <main className="main-content">
          <div className="edit-profile-container">

            {/* Page Header */}
            <div className="edit-header">
              <h1 className="edit-title">School Profile</h1>
            </div>

            <div className="subtitle-container">
              <div className="subtitle-heading">
                <p className="edit-subtitle">
                  <b>School Profile Registration</b>
                  <br />
                  Complete your school profile to join the annual sustainability competition
                </p>

                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>

              {/* School Basic Information */}
              <div className="form-card">
                <h2 className="form-section-title">🏫 School Basic Information</h2>

                {/* Row 1 */}
                <div className="form-row">
                  <div className="form-group">
                    <label>School Name</label>
                    <input
                      type="text"
                      name="schoolName"
                      placeholder="Enter school name"
                      value={formData.schoolName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>School Code</label>
                    <input
                      type="text"
                      name="schoolCode"
                      placeholder="Enter school code"
                      value={formData.schoolCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="form-row">
                  <div className="form-group full">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter complete school address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person Name</label>
                    <input
                      type="text"
                      name="contactPerson"
                      placeholder="Enter contact person name"
                      value={formData.contactPerson}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="form-row">
                  <div className="form-group full">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Infrastructure Details */}
              <div className="form-card">
                <h2 className="form-section-title">🏠 Infrastructure Details</h2>
                <div className="form-group full">
                <textarea
                  name="infrastructure"
                  placeholder="Describe Infrastructure Details..."
                  value={formData.infrastructure}
                  onChange={handleChange}
                  rows="5"
                />
                </div>
              </div>

              {/* Vision & Mission */}
              <div className="form-card">
                <h2 className="form-section-title">💡 Vision & Mission</h2>

                <div className="form-group full">
                  <label>Vision Statement</label>
                  <textarea
                    name="vision"
                    placeholder="E.g. Our school strives to embed sustainability in curriculum..."
                    value={formData.vision}
                    onChange={handleChange}
                    rows="4"
                  />
                  <small>Maximum 500 words</small>
                </div>

                <div className="form-group full" style={{ marginTop: "1rem" }}>
                  <label>Mission Statement</label>
                  <textarea
                    name="mission"
                    placeholder="Describe your school’s mission and goals..."
                    value={formData.mission}
                    onChange={handleChange}
                    rows="4"
                  />
                  <small>Maximum 500 words</small>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="save-container">
              <button className="save-btn" onClick={handleSave}>
                Save changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
