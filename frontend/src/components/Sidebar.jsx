import React from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  BarChart3, 
  UserPlus, 
  Map, 
  Heart, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Import
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeItem = "School management" }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: Building2, label: "School management", path: "/school-profile" },
    { icon: Users, label: "Social coach management", path: "/social-coach-management" },
    { icon: GraduationCap, label: "Student Management", path: "/student-management" },
    { icon: BarChart3, label: "Leaderboard & Reports", path: "/leaderboard" },
    { icon: UserPlus, label: "Assign Social Coach", path: "/assign-coach" },
    { icon: Map, label: "User Journey Ecosystem", path: "/user-journey" },
    { icon: Heart, label: "Assign Health and wellness", path: "/health-wellness" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    // optional: localStorage/session clear panna
    localStorage.removeItem("token"); 
    // navigate to login
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon />
              <span className="sidebar-item-text">{item.label}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <div className="sidebar-divider">
          <div className="logout-item">
            <LogOut />
            <span className="logout-item-text" onClick={handleLogout} style={{ cursor: "pointer" }}>
      Logout
    </span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
