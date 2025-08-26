import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../../../components/Sidebar";
import '../addCoach/AddCoach.css';


const AddCoach = () => {
  const navigate = useNavigate();

  return (
    <div className="add-coach-page App">
      {/* ✅ Header */}
      <Header adminName="School Admin" />

      <div className="app-body">
        {/* ✅ Sidebar */}
        <Sidebar activeItem="Social coach management" />

        {/* ✅ Main content */}
        <main className="main-content">
          <div className="main-profile">
            <div className="coach-form-container">
              <h2 className="form-title">Add Coach</h2>

              <form className="coach-form">
                <h3 className="section-title">Basic Info</h3>
                <hr></hr>
                <div className="form-grid">
                  <div>
                    <label>First Name</label>
                    <input type="text" placeholder="Enter First Name" />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter Last Name" />
                  </div>
                  <div>
                    <label>School Name</label>
                    <input type="text" placeholder="Enter School Name" />
                  </div>
                  <div>
                    <label>School Code</label>
                    <input type="text" value="SCH-2024-001" disabled />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" />
                  </div>
                  <div>
                    <label>Joining Date</label>
                    <input type="date" />
                  </div>
                  <div>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" />
                  </div>
                  <div>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                  <div>
                    <label>Gender</label>
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label>Mobile Number</label>
                    <input type="text" placeholder="Enter Mobile Number" />
                  </div>
                  <div>
                    <label>Designation</label>
                    <select>
                      <option>Teacher</option>
                      <option>Asst Teacher</option>
                    </select>
                  </div>
                  <div>
                    <label>Department</label>
                    <select>
                      <option>Tamil</option>
                      <option>Maths</option>
                      <option>Science</option>
                    </select>
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <input type="date" />
                  </div>
                  <div>
                    <label>Blood Group</label>
                    <select>
                      <option>A+</option>
                      <option>B+</option>
                      <option>O+</option>
                    </select>
                  </div>
                  <div>
                    <label>Status</label>
                    <select>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="address-field">
                  <label>Address</label>
                  <textarea placeholder="Enter Address"></textarea>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="btn-add">Add</button>
                  <button type="button" className="course-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCoach;
