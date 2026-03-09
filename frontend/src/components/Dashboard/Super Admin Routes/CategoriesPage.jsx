import React, { useEffect, useState } from "react";
import axios from "../../../services/api";

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">

        <h1 className="text-2xl font-semibold mb-6">
          Manage Categories
        </h1>

        {/* Add Category */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAddCategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Categories List */}
        <div>

          <h2 className="text-lg font-medium mb-3">
            Existing Categories
          </h2>

          <div className="border rounded-lg max-h-80 overflow-y-auto">

            {loading ? (
              <p className="p-4 text-gray-500">Loading categories...</p>
            ) : categories.length === 0 ? (
              <p className="p-4 text-gray-500">No categories found</p>
            ) : (
              <ul>

                {categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="px-4 py-3 border-b last:border-none hover:bg-gray-50"
                  >
                    {cat.name}
                  </li>
                ))}

              </ul>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default CategoriesPage;
