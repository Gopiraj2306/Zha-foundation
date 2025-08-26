import React from "react";
import Header from "../Header";
import Sidebar from "../../../components/Sidebar";
import "./AddStudent.css";

const AddStudent = () => {
  return (
    <div className="add-student-page App">
      <Header adminName="School Admin" />
      <div className="app-body">
        <Sidebar activeItem="Student Management" />

        <main className="main-content">
          <div className="main-profile">
            <div className="page-header">
              <h2>Student Management &gt; Add Students</h2>
            </div>

            <form className="student-form">
              <h3 className="section-title">Basic Info</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>School Name</label>
                  <input type="text" placeholder="Enter School Name" />
                </div>
                <div className="form-group">
                  <label>School Code</label>
                  <input type="text" value="SCH-2024-001" disabled />
                </div>

                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="Enter First Name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Enter Last Name" />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                  <label>Registration Date</label>
                  <input type="date" />
                </div>

                <div className="form-group">
                  <label>Roll No</label>
                  <input type="text" placeholder="Enter Roll No" />
                </div>
                <div className="form-group">
                  <label>Class</label>
                  <input type="text" value="XI" />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Section</label>
                  <input type="text" value="A" />
                </div>

                <div className="form-group">
                  <label>Father Name</label>
                  <input type="text" placeholder="Enter Parent's Name" />
                </div>
                <div className="form-group">
                  <label>Father Mobile Number</label>
                  <input type="text" placeholder="Parent's Mobile Number" />
                </div>

                <div className="form-group">
                  <label>Mother Name</label>
                  <input type="text" placeholder="Enter Mobile Number" />
                </div>
                <div className="form-group">
                  <label>Mother Mobile Number</label>
                  <input type="text" placeholder="Enter Mobile Number" />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                    <select>
                      <option>A+</option>
                      <option>B+</option>
                      <option>O+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                </div>
               <div className="form-group">
                  <label>Address</label>
                  <textarea placeholder="Enter Address"></textarea>
                </div>
              </div>

              {/* Buttons */}
              <div className="form-buttons">
                  <button type="submit" className="btn-add">Add</button>
                  <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddStudent;
