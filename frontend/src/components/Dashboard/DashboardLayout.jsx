import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "../../styles/DashboardLayout.css";

const DashboardLayout = ({ role, userName, children }) => {
  return (
    <div className="dashboard-container">

      {/* Header */}
      <Header userName={userName} />

      {/* Body Section */}
      <div className="dashboard-body">
        <Sidebar role={role} />

        <div className="main-content">
          {children}
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
