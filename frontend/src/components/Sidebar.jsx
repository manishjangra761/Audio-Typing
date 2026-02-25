import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ role }) => {

  const menuItems = {
    superadmin: [
      { name: "Dashboard", path: "/superadmin/dashboard" },
      { name: "Exam Categories", path: "/superadmin/exam-categories" },
      { name: "Languages", path: "/superadmin/languages" },
      { name: "Admins Management", path: "/superadmin/admins" },
      { name: "Students Management", path: "/superadmin/students" },
      { name: "Audio Library", path: "/superadmin/audio-library" },
      { name: "Reports", path: "/superadmin/reports" },
      { name: "Analytics", path: "/superadmin/analytics" },
      { name: "System Settings", path: "/superadmin/settings" }
    ],
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Upload Audio", path: "/admin/upload-audio" },
      { name: "Manage Audio", path: "/admin/manage-audio" },
      { name: "Test Management", path: "/admin/tests" },
      { name: "Results", path: "/admin/results" },
      { name: "Reports", path: "/admin/reports" }
    ],
    student: [
      { name: "Dashboard", path: "/student/dashboard" },
      { name: "Start Practice", path: "/student/practice" },
      { name: "My Results", path: "/student/results" },
      { name: "Performance History", path: "/student/history" },
      { name: "Profile", path: "/student/profile" }
    ]
  };

  return (
    <div className="sidebar">
      {/* <h2 className="logo">Typing App</h2> */}

      <ul className="menu">
        {menuItems[role]?.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
