import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import axios from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  let [data, setData] = useState({
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
        navigate('/dashboard');
      } else {
      toast.error(response.message || response.data.message);
    }
  }
    catch (err) {
    console.log(err)
    toast.error(err.message);
  }
}

return (
  <AuthLayout title="Welcome Back">

    <div className="input-group">
      <FaEnvelope className="input-icon" />
      <input type="email" placeholder="Email Address" name="email" onChange={handleData} />
    </div>

    <div className="input-group">
      <FaLock className="input-icon" />
      <input type="password" placeholder="Password" name="password" onChange={handleData} />
    </div>

    <div className="login-options">
      <a href="#">Forgot Password?</a>
    </div>

    <button type="button" onClick={handleLogin}>Login</button>

    <p className="auth-switch">
      Don’t have an account? <a href="/register">Register</a>
    </p>

  </AuthLayout>
);
};

export default Login;
