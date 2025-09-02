import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../school/Header";
import Sidebar from "../../components/Sidebar";
import "./AdminStudentManagement.css";

const AdminStudentManagement = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [schools, setSchools] = useState([
    {
      id: 1,
      name: "Sunrise School",
      email: "sunrise@school.edu",
      code: "SCH001",
      registrationDate: "2024-12-15",
      status: "Pending",
    },
    {
      id: 2,
      name: "Bluebell Academy",
      email: "bluebell@academy.edu",
      code: "SCH002",
      registrationDate: "2024-12-14",
      status: "Active",
    },
    {
      id: 3,
      name: "Greenwood High",
      email: "greenwood@high.edu",
      code: "SCH003",
      registrationDate: "2024-12-13",
      status: "Inactive",
    },
  ]);

  const navigate = useNavigate();

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleDeleteClick = (school) => {
    setSchoolToDelete(school);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    // 🔥 Remove school from list (UI only)
    setSchools(schools.filter((s) => s.id !== schoolToDelete.id));
    setShowDeletePopup(false);
    setSchoolToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setSchoolToDelete(null);
  };

  return (
    <div className="admin-student-page App">
      {/* Header */}
      <Header adminName="Super Admin" />

      <div className="app-body">
        {/* Sidebar */}
        <Sidebar role="superadmin" activeItem="Student Management" />

        {/* Main Content */}
        <main className="main-content">
          <div className="superadmin-page-header">
            <h2>School Management</h2>
            <p>Manage schools registration and approval</p>
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <input
              type="text"
              placeholder="Search schools..."
              className="search-input"
            />
            <select className="filter-select">
              <option>All Districts</option>
              <option>District 1</option>
              <option>District 2</option>
            </select>
            <select className="filter-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="tabs">
            <button className="tab active">
              Pending <span>12</span>
            </button>
            <button className="tab">
              Approved <span>45</span>
            </button>
            <button className="tab">
              Rejected <span>3</span>
            </button>
          </div>

          {/* Table */}
          <div className="superadmin-table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>School Name</th>
                  <th>School Code</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, idx) => (
                  <tr key={school.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="school-info">
                        <span className="school-icon">🏫</span>
                        <div>
                          <strong>{school.name}</strong>
                          <p>{school.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{school.code}</td>
                    <td>{new Date(school.registrationDate).toDateString()}</td>
                    <td>{school.status}</td>
                    <td className="action-cell">
                      <div className="action-menu">
                        <MoreVertical
                          size={18}
                          onClick={() => toggleMenu(idx)}
                          style={{ cursor: "pointer" }}
                        />
                        {openMenu === idx && (
                          <div className="dropdown">
                            <div
                              onClick={() =>
                                navigate(`/schools/view/${school.id}`)
                              }
                            >
                              📋 View School
                            </div>
                            <div
                              onClick={() =>
                                navigate(`/schools/edit/${school.id}`)
                              }
                            >
                              ✏️ Edit School
                            </div>
                            <div
                              className="delete"
                              onClick={() => handleDeleteClick(school)}
                            >
                              🗑️ Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bulk Actions */}
          <div className="bulk-actions">
            <span className="action-label">Bulk Actions:</span>
            <button className="approve-btn">Approve Selected</button>
            <button className="reject-btn">Reject Selected</button>
            <span className="selected-count">0 schools selected</span>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button>{"<"}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Are you sure?</h3>
            <p>
              Do you really want to delete{" "}
              <strong>{schoolToDelete?.name}</strong>?
            </p>
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="cancel-btn" onClick={confirmDelete} style={{backgroundColor:'#dc3545', color:'#fff'}}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudentManagement;
