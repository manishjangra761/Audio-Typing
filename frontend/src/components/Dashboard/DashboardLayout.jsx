import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useUser } from "../../context/UserContext";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="w-full h-screen bg-gradient-mesh flex flex-col overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full mix-blend-screen filter blur-3xl floating"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-1s' }}></div>
      </div>

      {/* Header */}
      <Header userName={user?.name || 'User'} />

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar role={user?.type || 'student'} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 lg:p-12 space-y-6 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
