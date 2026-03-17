import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import axios from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext';

const Login = () => {

  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: data.email,
        pass: data.password
      }
      const response = await axios.post('/login',
        payload,
        { withCredentials: true }
      );

      if (response.data.accessToken) {
        toast.success(response.data.message);
        setData({
          email: "",
          password: ""
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user_info', JSON.stringify(response.data.user));

        // Update the user context immediately
        setUser(response.data.user);

        if(response.data.user.role === 'admin') navigate('/admin');
        if(response.data.user.role === 'super_admin') navigate('/superadmin');
        if(response.data.user.role === 'user') navigate('/student');
      } else {
        toast.error(response.message || response.data.message);
      }
    }
    catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || err.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome Back">

      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-300">Email Address</label>
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 text-sm" />
          <input 
            type="email" 
            placeholder="you@example.com" 
            name="email" 
            value={data.email}
            onChange={handleData}
            className="input-field pl-10" 
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-neutral-300">Password</label>
        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 text-sm" />
          <input 
            type="password" 
            placeholder="••••••••" 
            name="password" 
            value={data.password}
            onChange={handleData}
            className="input-field pl-10" 
          />
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <a href="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300 font-semibold smooth-transition hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Login Button */}
      <button 
        type="button" 
        onClick={handleLogin}
        disabled={loading}
        className="btn w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : (
          <>
            Sign In
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

    </AuthLayout>
  );
};

export default Login;
