import axios from "../../src/services/api";
import React, { useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes, FaUser, FaCog, FaChartLine, FaMicrophone, FaClipboardList, FaHistory, FaUserCog, FaBook, FaFileAlt, FaUsers } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from '../context/UserContext';

const Header = ({ userName, userRole }) => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarMenuItems = {
    super_admin: [
      { name: "Dashboard", path: "/superadmin", icon: FaChartLine },
      { name: "Exam Categories", path: "/superadmin/exam-categories", icon: FaBook },
      { name: "Admins Management", path: "/superadmin/admins", icon: FaUsers },
      { name: "Users Management", path: "/superadmin/users", icon: FaUserCog },
      { name: "Audio Library", path: "/superadmin/audio-library", icon: FaMicrophone },
      { name: "Contact Messages", path: "/superadmin/contact_messages", icon: FaClipboardList },
      { name: "Profile", path: "/superadmin/profile", icon: FaUserCog },
    ],
    admin: [
      { name: "Dashboard", path: "/admin", icon: FaChartLine },
      { name: "Users", path: "/admin/users", icon: FaUsers },
      { name: "Upload Audio", path: "/admin/upload-audio", icon: FaMicrophone },
      { name: "Manage Audio", path: "/admin/manage-audio", icon: FaBook },
      { name: "Results", path: "/admin/results", icon: FaFileAlt },
      { name: "Profile", path: "/admin/profile", icon: FaUserCog },
    ],
    user: [
      { name: "Dashboard", path: "/student", icon: FaChartLine },
      { name: "Start Practice", path: "/student/practice", icon: FaMicrophone },
      { name: "My Results", path: "/student/results", icon: FaClipboardList },
      { name: "Performance History", path: "/student/history", icon: FaHistory },
      { name: "Profile", path: "/student/profile", icon: FaUserCog },
    ],
  };
  const mobileNavItems = sidebarMenuItems[userRole] || [];

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout', {}, { withCredentials: true });

      // Use the context logout function to clear user state
      logout();

      toast.success(response.data.message || "Logged out successfully");

      navigate('/login');

    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };


  return (
    <header className="sticky top-0 z-50 glass-elevated backdrop-blur-xl border-b border-white/10">
      <div className="px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">

        {/* Logo  */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">📚</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Audio Typing
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* User Info */}
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/50 to-accent-500/50 flex items-center justify-center border border-primary-400/50">
              <span className="text-white font-bold text-sm">{userName?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Welcome</span>
              <span className="text-xs text-neutral-400">{userName}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <button className="glass p-3 rounded-lg hover:glass-light smooth-transition text-neutral-300 hover:text-primary-400">
            <FaCog className="w-5 h-5" />
          </button> */}

          <button
            onClick={handleLogout}
            className="glass p-3 rounded-lg hover:glass-light smooth-transition text-neutral-300 hover:text-red-400"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden glass p-2 rounded-lg text-white"
        >
          {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10 p-4 space-y-3 animate-fadeInDown max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain">
          <div className="glass rounded-lg px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/50 flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-neutral-400">Account</p>
            </div>
          </div>

          <nav className="space-y-2">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full px-4 py-3 rounded-lg text-left smooth-transition flex items-center gap-3 ${
                      isActive
                        ? "bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-400 border-l-2 border-primary-400"
                        : "glass text-white hover:glass-light"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <button className="w-full glass px-4 py-2 rounded-lg text-left text-white hover:glass-light smooth-transition flex items-center gap-3">
            <FaCog className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full glass px-4 py-2 rounded-lg text-left text-red-400 hover:glass-light smooth-transition flex items-center gap-3"
          >
            <FaSignOutAlt className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
