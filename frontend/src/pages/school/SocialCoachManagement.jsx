import React, { useState } from "react";
import { Filter, Plus, Upload, MoreVertical } from "lucide-react";
import Header from "./Header";
import Sidebar from "../../components/Sidebar";
import "./SocialCoachManagement.css";
import { useNavigate } from "react-router-dom";

// sample data (add more to test pagination)
const coaches = [
  { photo: "https://randomuser.me/api/portraits/men/1.jpg", name: "Akash H", department: "Tamil", gender: "Male", email: "akashsvs@gmail.com", mobile: "9458795215", designation: "Teacher" },
  { photo: "https://randomuser.me/api/portraits/men/2.jpg", name: "Karthi G", department: "Maths", gender: "Male", email: "karthisvs@gmail.com", mobile: "6358795215", designation: "Asst Teacher" },
  { photo: "https://randomuser.me/api/portraits/women/3.jpg", name: "Renuka S", department: "Science", gender: "Female", email: "renukasvs@gmail.com", mobile: "9458795215", designation: "Teacher" },
  { photo: "https://randomuser.me/api/portraits/men/4.jpg", name: "Ravi K", department: "English", gender: "Male", email: "ravi@gmail.com", mobile: "7458795215", designation: "Teacher" },
  { photo: "https://randomuser.me/api/portraits/women/5.jpg", name: "Priya M", department: "History", gender: "Female", email: "priya@gmail.com", mobile: "8458795215", designation: "Asst Teacher" },
  { photo: "https://randomuser.me/api/portraits/men/6.jpg", name: "Suresh P", department: "Geography", gender: "Male", email: "suresh@gmail.com", mobile: "9458791111", designation: "Teacher" },
  { photo: "https://randomuser.me/api/portraits/women/7.jpg", name: "Lakshmi D", department: "Biology", gender: "Female", email: "lakshmi@gmail.com", mobile: "7458795222", designation: "Teacher" },
];

const SocialCoachManagement = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null); // track which row menu is open
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // how many rows per page

  const toggleMenu = (idx) => {
    setOpenMenu(openMenu === idx ? null : idx);
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = coaches.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(coaches.length / rowsPerPage);

  return (
    <div className="social-coach-page App">
      <Header adminName="School Admin" />
      <div className="app-body">
        <Sidebar activeItem="Social coach management" />

        <main className="main-content">
          <div className="main-profile">
            <div className="page-header">
              <h2>Coach Management &gt; <span>All Coach</span></h2>
            </div>

            {/* Search & Buttons */}
            <div className="actions-bar">
              <div className="search-box">
                <input type="text" placeholder="Search" />
                <Filter size={36} className="filter-icon" />
              </div>
              <div className="buttons">
                <button className="btn-upload">
                  <Upload size={16} /> Bulk Upload
                </button>
                <button className="btn-add" onClick={() => navigate('/add-coach')}>
                  <Plus size={16} /> Add Coach
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
                    <th>Coach Name</th>
                    <th>Department</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Designation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((coach, idx) => (
                    <tr key={idx}>
                      <td><input type="checkbox" /></td>
                      <td><img src={coach.photo} alt={coach.name} className="avatar" /></td>
                      <td>{coach.name}</td>
                      <td>{coach.department}</td>
                      <td>{coach.gender}</td>
                      <td>{coach.email}</td>
                      <td>{coach.mobile}</td>
                      <td>{coach.designation}</td>
                      <td>
                        <div className="action-menu">
                          <MoreVertical
                            size={18}
                            onClick={() => toggleMenu(idx)}
                            style={{ cursor: "pointer" }}
                          />
                          {openMenu === idx && (
                            <div className="dropdown">
                              <div onClick={() => navigate('/coach-details')}>📋 Coach details</div>
                              <div onClick={()=> navigate('/social-coach/edit/:id')}>✏️ Edit Coach</div>
                              <div onClick={() => navigate('/login-details')}>🔒 Login Details</div>
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
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={currentPage === idx + 1 ? "active" : ""}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SocialCoachManagement;
