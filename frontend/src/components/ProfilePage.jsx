import React, { useState, useEffect } from "react";
import axios from "../services/api";
import { useUser } from "../context/UserContext";
import RoleBased from "./RoleBased";
import { FaUser, FaPhone, FaEnvelope, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user } = useUser();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/user/profile");
      const userData = res.data.user;

      setProfile(userData);

      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      });

    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put("/user/profile", formData);

      setProfile({ ...profile, ...formData });
      setEditing(false);

    } catch (err) {
      console.error(err);
      toast("Profile update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-12 rounded-3xl text-center">
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Profile Header */}
      <div className="glass-card p-8 rounded-3xl flex items-center justify-between">

        <div className="flex items-center gap-6">
          <img
            src={`https://i.pravatar.cc/150?img=${profile.id || 12}`}
            alt="profile"
            className="w-24 h-24 rounded-full border border-white/20"
          />

          <div>
            <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
            <p className="text-neutral-400 capitalize">
              {profile.type?.replace("_", " ")}
            </p>
          </div>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="btn btn-primary flex items-center gap-2"
          >
            <FaEdit />
            Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="btn btn-primary flex items-center gap-2"
              disabled={saving}
            >
              <FaSave />
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleCancel}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Role Info
      <div className="glass-card p-6 rounded-3xl">
        <RoleBased roles={['super_admin']}>
          <p className="text-yellow-400">
            <strong>Super Admin:</strong> Full system access including admins, users, categories and audio library.
          </p>
        </RoleBased>

        <RoleBased roles={['admin']}>
          <p className="text-blue-400">
            <strong>Admin:</strong> Manage users, upload audio files and monitor results.
          </p>
        </RoleBased>

        <RoleBased roles={['user']}>
          <p className="text-green-400">
            <strong>Student:</strong> Practice typing tests and track your performance.
          </p>
        </RoleBased>
      </div> */}

      {/* Profile Details */}
      <div className="glass-card p-8 rounded-3xl">

        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FaUser className="text-primary-400" />
          Profile Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="text-neutral-400 text-sm">Full Name</label>

            {editing ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 mt-1"
              />
            ) : (
              <div className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 mt-1">
                {profile.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-neutral-400 text-sm flex items-center gap-2">
              <FaEnvelope /> Email
            </label>

            {editing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 mt-1"
              />
            ) : (
              <div className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 mt-1">
                {profile.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-neutral-400 text-sm flex items-center gap-2">
              <FaPhone /> Phone
            </label>

            {editing ? (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 mt-1"
              />
            ) : (
              <div className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 mt-1">
                {profile.phone}
              </div>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="text-neutral-400 text-sm">Role</label>

            <div className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 mt-1 capitalize">
              {profile.type?.replace("_", " ")}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-neutral-400 text-sm">Status</label>

            <div className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 mt-1 capitalize">
              {profile.status}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
