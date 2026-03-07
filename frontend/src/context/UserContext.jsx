import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await api.get('/user/get_profile');
          setUser(response.data.user);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // If token is invalid, clear it
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};