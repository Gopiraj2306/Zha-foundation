import React, { useState } from "react";
import { Filter, Plus, Upload, MoreVertical } from "lucide-react";
import Header from "./Header";
import Sidebar from "../../components/Sidebar";
import "./StudentManagement.css";

const students = [
  { photo: "https://randomuser.me/api/portraits/men/10.jpg", name: "K Abishek", admission: "SVS2364102", roll: "4102", class: "XI", section: "A", gender: "Male", dob: "25/07/2007" },
  { photo: "https://randomuser.me/api/portraits/men/11.jpg", name: "J Bala", admission: "SVS2364104", roll: "4104", class: "XI", section: "A", gender: "Male", dob: "21/02/2007" },
  { photo: "https://randomuser.me/api/portraits/men/12.jpg", name: "K Chandru", admission: "SVS2364102", roll: "4102", class: "XI", section: "A", gender: "Male", dob: "23/04/2007" },
  { photo: "https://randomuser.me/api/portraits/women/13.jpg", name: "O Diviya", admission: "SVS2364109", roll: "4109", class: "XI", section: "A", gender: "Female", dob: "25/06/2008" }
];

const StudentManagement = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (idx) => {
    setOpenMenu(openMenu === idx ? null : idx);
  };

  return (
    <div className="student-management-page App">

      <Header adminName="School Admin" />
      <div className="app-body">
        <Sidebar activeItem="Student management" />

        <main className="main-content">
          <div className="main-profile">
            {/* Page Header */}
            <div className="student-page-header">
              <h2>Student Management &gt; <span>All Students</span></h2>
            </div>

           
                       {/* Search & Buttons */}
                       <div className="actions-bar">
                         <div className="student-search-box">
                           <input type="text" placeholder="Search" />
                           <Filter size={36} className="student-filter-icon" />
                         </div>
                         <div className="buttons">
                           <button className="btn-upload ">
                             <Upload size={16} /> Bulk Upload
                           </button>
                           <button className="btn-add " onClick={() => navigate('/add-coach')}>
                             <Plus size={16} /> Add Students
                           </button>
                         </div>
                       </div>

            {/* Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Admission No</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={idx}>
                      <td><input type="checkbox" /></td>
                      <td><img src={student.photo} alt={student.name} className="avatar" /></td>
                      <td>{student.name}</td>
                      <td>{student.admission}</td>
                      <td>{student.roll}</td>
                      <td>{student.class}</td>
                      <td>{student.section}</td>
                      <td>{student.gender}</td>
                      <td>{student.dob}</td>
                      <td>
                        <div className="action-menu">
                          <MoreVertical size={18} onClick={() => toggleMenu(idx)} />
                          {openMenu === idx && (
                            <div className="dropdown">
                              <div>👁️ View Details</div>
                              <div>✏️ Edit Student</div>
                              <div>🔒 Login Details</div>
                              <div className="delete">🗑️ Delete</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                <button>{"<"}</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>{">"}</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentManagement;
