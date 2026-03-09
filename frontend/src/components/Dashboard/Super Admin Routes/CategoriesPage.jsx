import React, { useEffect, useState } from "react";
import axios from "../../../services/api";
import {
  FaTags,
  FaPlus,
  FaList,
  FaExclamationTriangle,
  FaTrash,
  FaEdit
} from "react-icons/fa";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/category/get_all_categories");

      if (res.data?.categories) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      const res = await axios.post("/admin/add_new_category", {
        name: categoryName,
      });

      if (res.data?.success) {
        setCategoryName("");
        fetchCategories();
        alert("Category added successfully!");
      }
    } catch (error) {
      console.error("Error adding category", error);
      alert("Failed to add category");
    }
  };

  const handleEditCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      const res = await axios.put(`/admin/update_category/${editId}`, {
        name: categoryName,
      });

      if (res.data?.success) {
        setCategoryName("");
        setShowModal(false);
        setEditId(null);
        fetchCategories();
        alert("Category updated successfully!");
      }
    } catch (error) {
      console.error("Error updating category", error);
      alert("Failed to update category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/admin/delete_category/${id}`);
      fetchCategories();
      setDeleteConfirm(null);
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Failed to delete category");
    }
  };

  const openEditModal = (category) => {
    setEditId(category.id);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditId(null);
    setCategoryName("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await handleEditCategory();
    } else {
      await handleAddCategory();
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-card p-12 rounded-3xl text-center">
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Categories</h2>
          <p className="text-neutral-400">Fetching category data...</p>
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
            <FaTags className="w-8 h-8 text-primary-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Category Management</h1>
              <p className="text-neutral-300 mt-1">
                Organize and manage audio categories for better content structure
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="btn btn-primary flex items-center gap-2 px-6 py-3 rounded-xl hover:scale-105 smooth-transition"
          >
            <FaPlus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        {/* Quick Add Form */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
          />

          <button
            onClick={handleAddCategory}
            className="btn btn-primary px-6 py-3 rounded-lg hover:scale-105 smooth-transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Category Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <FaExclamationTriangle className="w-12 h-12 text-neutral-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">No Categories Found</h3>
                        <p className="text-neutral-400 text-sm">Start by adding your first category</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-white font-mono text-sm">#{cat.id}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                          <FaTags className="w-4 h-4 text-primary-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{cat.name}</div>
                          <div className="text-neutral-400 text-sm">ID: {cat.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="btn btn-primary p-2 rounded-lg hover:scale-105 smooth-transition"
                          title="Edit category"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(cat.id)}
                          className="btn btn-danger p-2 rounded-lg hover:scale-105 smooth-transition"
                          title="Delete category"
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
              <FaTags className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-semibold text-white">
                {editId ? "Edit Category" : "Add New Category"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                  required
                />
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
                  {editId ? "Update Category" : "Add Category"}
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
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteCategory(deleteConfirm)}
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

export default CategoriesPage;
