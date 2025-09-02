import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./ViewRegistrationForm.css"; // you can reuse the same css

export default function EditRegistrationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy static school data (pre-populated)
  const schoolData = {
    schoolName: "Sunrise School",
    schoolLandline: "044-22334455",
    schoolMobile: "9876543210",
    teachers: "50",
    contactPerson: "John Doe",
    contactMobile: "9876500000",
    schoolType: "Private",
    schoolManagement: "Unaided",
    contactEmail: "john@sunrise.edu",
    state: "Tamil Nadu",
    district: "Chennai",
    schoolEmail: "sunrise@school.edu",
    class: "1-12",
    fax: "044-22334466",
    pin: "600001",
    address1: "No 123, Main Road",
    address2: "Anna Nagar",
    address3: "Chennai",
    landmark: "Near Metro Station",
    approval: "pending",
    reason: "",
  };

  const [formData, setFormData] = useState(schoolData);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Changes Saved Successfully!");
    // API call to update school data can go here
  };

  return (
    <div className="view-school-page App">
      <div className="view-app-body">
        {/* Main Content */}
        <main className="view-main-content">
          <div className="view-page-header">
            <h2>View School Registration</h2>
            <p>Update the registered school details</p>
          </div>

          {/* Editable Form */}
          <form className="view-school-form" onSubmit={handleSubmit}>
            <div className="view-form-row">
              <div className="view-form-group">
                <label>School Name</label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>School Landline No</label>
                <input
                  type="text"
                  name="schoolLandline"
                  value={formData.schoolLandline}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>School Mobile No</label>
                <input
                  type="text"
                  name="schoolMobile"
                  value={formData.schoolMobile}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>No. Of Teachers</label>
                <input
                  type="text"
                  name="teachers"
                  value={formData.teachers}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Contact Person Mobile</label>
                <input
                  type="text"
                  name="contactMobile"
                  value={formData.contactMobile}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>School Type</label>
                <input
                  type="text"
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>School Management</label>
                <input
                  type="text"
                  name="schoolManagement"
                  value={formData.schoolManagement}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Education District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>School Email</label>
                <input
                  type="email"
                  name="schoolEmail"
                  value={formData.schoolEmail}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>Class</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Fax No</label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>PIN</label>
                <input
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="view-form-group">
                <label>Address Line 3</label>
                <input
                  type="text"
                  name="address3"
                  value={formData.address3}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="view-form-row">
              <div className="view-form-group">
                <label>Approval</label>
                <select
                  name="approval"
                  value={formData.approval}
                  onChange={handleChange}
                >
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="view-form-group">
                <label>Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            {/* Save & Cancel Buttons */}
            <div className="view-form-buttons">
              <button type="submit" className="view-save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="view-cancel-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
