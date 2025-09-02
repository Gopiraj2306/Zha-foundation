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
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ activeItem = "", role }) => {
  const navigate = useNavigate();

  // 🎯 Sidebar menus for each role
  const schoolAdminMenu = [
    { icon: Building2, label: "School management", path: "/school-profile" },
    { icon: Users, label: "Social coach management", path: "/social-coach-management" },
    { icon: GraduationCap, label: "Student Management", path: "/student-management" },
    { icon: BarChart3, label: "Leaderboard & Reports", path: "/leaderboard" },
    { icon: UserPlus, label: "Assign Social Coach", path: "/assign-coach" },
    { icon: Map, label: "User Journey Ecosystem", path: "/user-journey" },
    { icon: Heart, label: "Assign Health and wellness", path: "/health-wellness" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const superAdminMenu = [
    { icon: Building2, label: "School Management", path: "/admin/student-management" },
    { icon: Users, label: "Social Coach Management", path: "/superadmin/social-coach" },
    { icon: GraduationCap, label: "Governor Management", path: "/superadmin/governor" },
    { icon: BarChart3, label: "Leaderboard Management", path: "/superadmin/leaderboard" },
    { icon: Settings, label: "Settings", path: "/superadmin/settings" },
  ];

  // Pick menu based on role
  const menuItems = role === "superadmin" ? superAdminMenu : schoolAdminMenu;

  const handleLogout = () => {
    localStorage.removeItem("token"); 
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
          <div className="logout-item" onClick={handleLogout}>
            <LogOut />
            <span className="logout-item-text">Logout</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
