import React, { useEffect, useState } from "react";
import axios from "../../../services/api";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCrown,
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [originalStatus, setOriginalStatus] = useState(null);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "user",
    status: "active",
  });

  const location = useLocation();
  const isAdminPage = location.pathname.includes("admins");

  const pageTitle = isAdminPage ? "Admin Management" : "User Management";
  const addButtonText = isAdminPage ? "Add Admin" : "Add User";
  const emptyText = isAdminPage ? "No Admins Found" : "No Users Found";

  // FETCH USERS BASED ON LOGGED USER TYPE
  // const getUsers = async () => {
  //   try {
  //     setLoading(true);

  //     let res;

  //     if (location.pathname.includes("admins")) {
  //       res = await axios.get("/admin/get_all_admins");
  //       setUsers(res.data.admins || []);
  //     }
  //     else {
  //       res = await axios.get("/user/get_all_users");
  //       setUsers(res.data.users || []);
  //     }

  //   } catch (err) {
  //     console.log("Error fetching users:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getUsers = async (search = "", status = "") => {
    try {
      setLoading(true);

      let url = "";

      if (location.pathname.includes("admins")) {
        url = `/admin/get_all_admins?search=${search}&status=${status}`;
      } else {
        url = `/user/get_all_users?search=${search}&status=${status}`;
      }

      const res = await axios.get(url);

      if (location.pathname.includes("admins")) {
        setUsers(res.data.admins || []);
      } else {
        setUsers(res.data.users || []);
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    getUsers();
  }, [location.pathname]);

  useEffect(() => {

    if (debouncedSearch.length >= 3 || selectedStatus !== "") {
      getUsers(debouncedSearch, selectedStatus);
    }

    if (debouncedSearch.length === 0 && selectedStatus === "") {
      getUsers();
    }

  }, [debouncedSearch, selectedStatus]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const openAddModal = () => {

    setEditId(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      type: isAdminPage ? "admin" : "user",
      status: "active",
    });

    setShowModal(true);

  };

  const openEditModal = (user) => {

    setEditId(user.id);
    setOriginalStatus(user.status); // store original status

    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      password: "",
      type: user.type,
      status: user.status,
    });

    setShowModal(true);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(`/admin/update_user/${editId}`, formData);
        toast("User updated successfully");

      } else {

        await axios.post("/admin/add_new_user", formData);
        toast("User added successfully");

      }

      setShowModal(false);
      getUsers();

    } catch (err) {

      console.error(err);
      toast("Failed to save user");

    }

  };

  const handleDelete = async (id) => {

    try {

      await axios.delete(`/admin/delete_user/${id}`);
      toast("User deleted successfully");

      setDeleteConfirm(null);
      getUsers();

    } catch (err) {

      console.error(err);
      toast("Delete failed");

    }

  };

  const getStatusBadge = (status) => {

    return status === "active" ? (

      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400">
        <FaCheckCircle className="w-3 h-3" />
        Active
      </span>

    ) : status === "inactive" ? (

      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400">
        <FaTimesCircle className="w-3 h-3" />
        Inactive
      </span>

    ) : (

      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400">
        <FaTimesCircle className="w-3 h-3" />
        Unapproved
      </span>

    );

  };

  const getTypeBadge = (type) => {

    return type === "admin" ? (

      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
        <FaCrown className="w-3 h-3" />
        Admin
      </span>

    ) : (

      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/20 text-blue-400">
        <FaUserGraduate className="w-3 h-3" />
        User
      </span>

    );

  };

  if (loading) {

    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-card p-12 rounded-3xl text-center">
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Users</h2>
          <p className="text-neutral-400">Fetching user data...</p>
        </div>
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {isAdminPage ?
              <FaCrown className="w-8 h-8 text-yellow-400" /> :
              <FaUsers className="w-8 h-8 text-primary-400" />
            }
            <div>
              <h1 className="text-3xl font-bold text-white">{pageTitle}</h1>
              <p className="text-neutral-300 mt-1">
                {isAdminPage ? "Manage administrator accounts and permissions" : "View and manage all registered users in the system"}
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="btn btn-primary flex items-center gap-2 px-6 py-3 rounded-xl hover:scale-105 smooth-transition"
          >
            <FaPlus className="w-4 h-4" />
            {addButtonText}
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg pl-10 pr-4 py-3"
            />

          </div>

          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            >
              <option value="" className="bg-slate-800 text-white">All Status</option>
              <option value="active" className="bg-slate-800 text-white">Active</option>
              <option value="inactive" className="bg-slate-800 text-white">Inactive</option>
              <option value="unapproved" className="bg-slate-800 text-white">Unapproved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <FaExclamationTriangle className="w-12 h-12 text-neutral-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {searchTerm || selectedStatus ? "No Users Found" : emptyText}
                        </h3>
                        <p className="text-neutral-400 text-sm">
                          {searchTerm || selectedStatus
                            ? "Try adjusting your search or filter criteria"
                            : "No users have been registered yet"}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-white font-mono text-sm">#{user.id}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                          <span className="text-primary-400 font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-neutral-400 text-sm">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <FaEnvelope className="w-3 h-3 text-neutral-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-neutral-300">
                            <FaPhone className="w-3 h-3 text-neutral-400" />
                            <span className="text-sm">{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {getTypeBadge(user.type)}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="btn btn-primary p-2 rounded-lg hover:scale-105 smooth-transition"
                          title="Edit user"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(user.id)}
                          className="btn btn-danger p-2 rounded-lg hover:scale-105 smooth-transition"
                          title="Delete user"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 p-8 rounded-3xl max-w-md w-full mx-4 my-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              {isAdminPage ?
                <FaCrown className="w-6 h-6 text-yellow-400" /> :
                <FaUsers className="w-6 h-6 text-primary-400" />
              }
              <h3 className="text-xl font-semibold text-white">
                {editId ? "Edit User" : `Add New ${isAdminPage ? "Admin" : "User"}`}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                />
              </div>

              {!editId && (
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  User Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                >
                  <option value="user" className="bg-slate-800 text-white">User</option>
                  <option value="admin" className="bg-slate-800 text-white">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                >

                  {originalStatus === "unapproved" && (
                    <option value="unapproved" className="bg-slate-800 text-white">
                      Unapproved
                    </option>
                  )}

                  <option value="active" className="bg-slate-800 text-white">Active</option>
                  <option value="inactive" className="bg-slate-800 text-white">Inactive</option>

                </select>


              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  {editId ? "Update User" : `Add ${isAdminPage ? "Admin" : "User"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 p-8 rounded-3xl max-w-md mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-white">Confirm Delete</h3>
            </div>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn btn-danger flex-1"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );

};

export default UsersPage;
