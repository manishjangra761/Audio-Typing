import axios from '../../services/api';
import React, { useEffect } from 'react';
import DashboardLayout from './DashboardLayout';

const PracticePage = () => {
  const [categories, setCategories] = React.useState([]);

  const categoryList = async () => {
    try {
      const res = await axios.get('/category/get_all_categories');
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  useEffect(() => {
    categoryList();
  }, []);

  return (
    <DashboardLayout role="student" userName="Manish">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Practice Tests</h1>
          <p className="text-neutral-300">
            Choose a category you want to practice
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-neutral-400">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="glass-card p-6 rounded-2xl hover:glass-light smooth-transition cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PracticePage
