import React from "react";
import "../styles/DashboardLayout.css";

const Header = ({ userName }) => {
  return (
    <div className="header">
      <div className="header-left">
        <h2 className="logo">Typing App</h2>
      </div>

      <div className="header-right">
        <span className="welcome-text">Welcome, {userName}</span>
        <div className="profile-circle">
          {userName?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;
