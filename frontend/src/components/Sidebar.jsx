import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaMicrophone,
  FaClipboardList,
  FaHistory,
  FaUserCog,
  FaBook,
  FaFileAlt,
  FaUsers,
  FaTools,
  FaCogs,
  FaTimes
} from "react-icons/fa";

const Sidebar = ({ role }) => {

  const [expanded, setExpanded] = useState(true);

  const menuItems = {
    super_admin: [
      { name: "Dashboard", path: "/superadmin", icon: FaChartLine },
      { name: "Exam Categories", path: "/superadmin/exam-categories", icon: FaBook },
      // { name: "Languages", path: "/superadmin/languages", icon: FaTools },
      { name: "Admins Management", path: "/superadmin/admins", icon: FaUsers },
      { name: "Users Management", path: "/superadmin/users", icon: FaUserCog },
      { name: "Audio Library", path: "/superadmin/audio-library", icon: FaMicrophone },
      // { name: "Reports", path: "/superadmin/reports", icon: FaFileAlt },
      // { name: "Analytics", path: "/superadmin/analytics", icon: FaChartLine },
      { name: "System Settings", path: "/superadmin/settings", icon: FaCogs }
    ],
    admin: [
      { name: "Dashboard", path: "/admin", icon: FaChartLine },
      { name: "Users", path: "/admin/users", icon: FaUsers },
      { name: "Upload Audio", path: "/admin/upload-audio", icon: FaMicrophone },
      { name: "Manage Audio", path: "/admin/manage-audio", icon: FaBook },
      { name: "Results", path: "/admin/results", icon: FaFileAlt },
    ],
    user: [
      { name: "Dashboard", path: "/student", icon: FaChartLine },
      { name: "Start Practice", path: "/student/practice", icon: FaMicrophone },
      { name: "My Results", path: "/student/results", icon: FaClipboardList },
      { name: "Performance History", path: "/student/history", icon: FaHistory },
      { name: "Profile", path: "/student/profile", icon: FaUserCog }
    ]
  };


  const items = menuItems[role] || [];

  return (
    <>
      {/* Sidebar Toggle for Mobile */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="fixed bottom-6 right-6 z-40 md:hidden w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:glass-light smooth-transition"
      >
        {expanded ? <FaTimes className="w-5 h-5" /> : "≡"}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-30 h-screen left-0 top-0 glass-elevated border-r border-white/10 backdrop-blur-xl pt-6 overflow-y-auto smooth-transition ${
          expanded ? 'w-72' : 'w-0 md:w-20'
        } hidden md:flex flex-col`}
      >
        {/* Sidebar Content */}
        <div className="px-4 space-y-2 flex flex-col flex-1">
          {/* Navigation Items */}
          <nav className="space-y-1">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl smooth-transition text-sm font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-400 border-l-2 border-primary-400'
                        : 'text-neutral-400 hover:text-white hover:glass'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {expanded && <span className="whitespace-nowrap">{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-4 pb-6 border-t border-white/10 pt-4">
          <div className="glass rounded-lg p-3 text-xs text-neutral-400 text-center">
            {expanded ? 'Audio Typing v1.0' : ''}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Background */}
      {expanded && (
        <div 
          className="fixed inset-0 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
