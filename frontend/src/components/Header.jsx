import axios from "../../src/services/api";
import React, { useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ userName }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout', {}, { withCredentials: true });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

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
          <button className="glass p-3 rounded-lg hover:glass-light smooth-transition text-neutral-300 hover:text-primary-400">
            <FaCog className="w-5 h-5" />
          </button>

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
        <div className="md:hidden glass-card border-t border-white/10 p-4 space-y-3 animate-fadeInDown">
          <div className="glass rounded-lg px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/50 flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-neutral-400">Account</p>
            </div>
          </div>

          <button className="w-full glass px-4 py-2 rounded-lg text-left text-white hover:glass-light smooth-transition flex items-center gap-3">
            <FaCog className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={handleLogout}
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
