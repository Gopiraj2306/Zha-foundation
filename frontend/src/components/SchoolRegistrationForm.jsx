import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SchoolRegistrationForm.css";
import logo from "../assets/logo.png"; // replace with your local logo file path

export default function SchoolRegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolLandline: "",
    schoolMobile: "",
    teachers: "",
    contactPerson: "",
    contactMobile: "",
    schoolType: "",
    schoolManagement: "",
    contactEmail: "",
    state: "",
    district: "",
    schoolEmail: "",
    class: "",
    fax: "",
    pin: "",
    address1: "",
    address2: "",
    address3: "",
    landmark: "",
  });

  const [errors, setErrors] = useState({});

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // validation check
  const validate = () => {
    let newErrors = {};

    if (!formData.schoolName) newErrors.schoolName = "School Name is required";
    if (!formData.schoolLandline)
      newErrors.schoolLandline = "School Landline is required";
    if (!formData.schoolMobile)
      newErrors.schoolMobile = "School Mobile is required";
    if (!formData.contactPerson)
      newErrors.contactPerson = "Contact Person is required";
    if (!formData.contactMobile)
      newErrors.contactMobile = "Contact Person Mobile is required";
    if (!formData.schoolType) newErrors.schoolType = "Please select School Type";
    if (!formData.schoolManagement)
      newErrors.schoolManagement = "Please select School Management";
    if (!formData.contactEmail)
      newErrors.contactEmail = "Contact Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.contactEmail))
      newErrors.contactEmail = "Invalid Email format";

    if (!formData.state) newErrors.state = "Please select State";
    if (!formData.district) newErrors.district = "Please select District";
    if (!formData.schoolEmail)
      newErrors.schoolEmail = "School Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.schoolEmail))
      newErrors.schoolEmail = "Invalid Email format";

    if (!formData.address1) newErrors.address1 = "Address Line 1 is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      navigate("/login"); // submit -> go to login page
    }
  };

  // cancel
  const handleCancel = () => {
    navigate("/signup"); // cancel -> go to signup page
  };

  return (
    <div className="school-container">
      {/* Header */}
      <div className="school-header">
        <img src={logo} alt="Logo" className="school-logo" />
        <h1 className="school-title">
          ZHA Sustainability Practitioners Certifications Club
        </h1>
        <p className="school-subtitle">
          Professional Mentoring Young Generation
        </p>
        <div className="school-language">
          <span>English</span> | <span>Tamil</span>
        </div>
      </div>

      {/* Form */}
      <form className="school-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>
              School Name (For Certificate)<span>*</span>
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="School Name"
            />
            {errors.schoolName && <small>{errors.schoolName}</small>}
          </div>
          <div className="form-group">
            <label>
              School Landline No<span>*</span>
            </label>
            <input
              type="text"
              name="schoolLandline"
              value={formData.schoolLandline}
              onChange={handleChange}
              placeholder="School Landline"
            />
            {errors.schoolLandline && <small>{errors.schoolLandline}</small>}
          </div>
          <div className="form-group">
            <label>
              School Mobile No<span>*</span>
            </label>
            <input
              type="text"
              name="schoolMobile"
              value={formData.schoolMobile}
              onChange={handleChange}
              placeholder="School Mobile"
            />
            {errors.schoolMobile && <small>{errors.schoolMobile}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>No. Of Teachers</label>
            <input
              type="number"
              name="teachers"
              value={formData.teachers}
              onChange={handleChange}
              placeholder="Number of Teachers"
            />
          </div>
          <div className="form-group">
            <label>
              Contact Person<span>*</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person"
            />
            {errors.contactPerson && <small>{errors.contactPerson}</small>}
          </div>
          <div className="form-group">
            <label>
              Contact Person Mobile<span>*</span>
            </label>
            <input
              type="text"
              name="contactMobile"
              value={formData.contactMobile}
              onChange={handleChange}
              placeholder="Contact Mobile"
            />
            {errors.contactMobile && <small>{errors.contactMobile}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              School Type<span>*</span>
            </label>
            <select
              name="schoolType"
              value={formData.schoolType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Government</option>
              <option>Private</option>
            </select>
            {errors.schoolType && <small>{errors.schoolType}</small>}
          </div>
          <div className="form-group">
            <label>
              School Management<span>*</span>
            </label>
            <select
              name="schoolManagement"
              value={formData.schoolManagement}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Aided</option>
              <option>Unaided</option>
            </select>
            {errors.schoolManagement && <small>{errors.schoolManagement}</small>}
          </div>
          <div className="form-group">
            <label>
              Contact Person Email<span>*</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Contact Email"
            />
            {errors.contactEmail && <small>{errors.contactEmail}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              State<span>*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
            </select>
            {errors.state && <small>{errors.state}</small>}
          </div>
          <div className="form-group">
            <label>
              Education District<span>*</span>
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Chennai</option>
              <option>Madurai</option>
            </select>
            {errors.district && <small>{errors.district}</small>}
          </div>
          <div className="form-group">
            <label>
              School Email<span>*</span>
            </label>
            <input
              type="email"
              name="schoolEmail"
              value={formData.schoolEmail}
              onChange={handleChange}
              placeholder="School Email"
            />
            {errors.schoolEmail && <small>{errors.schoolEmail}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Class</label>
            <select name="class" value={formData.class} onChange={handleChange}>
              <option value="">Select</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="form-group">
            <label>School Fax No</label>
            <input
              type="text"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
              placeholder="Fax Number"
            />
          </div>
          <div className="form-group">
            <label>PIN code</label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="PIN Code"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              School Address 1<span>*</span>
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address Line 1"
            />
            {errors.address1 && <small>{errors.address1}</small>}
          </div>
          <div className="form-group">
            <label>School Address 2</label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address Line 2"
            />
          </div>
          <div className="form-group">
            <label>School Address 3</label>
            <input
              type="text"
              name="address3"
              value={formData.address3}
              onChange={handleChange}
              placeholder="Address Line 3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group ">
            <label>Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Landmark"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="submit-btnn">
            Submit for Approval
          </button>
          <button
            type="button"
            className="cancel-btnn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
