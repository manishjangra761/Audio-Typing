import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import AuthLayout from "./AuthLayout";

const Login = () => {
  return (
    <AuthLayout title="Welcome Back">

      <div className="input-group">
        <FaEnvelope className="input-icon" />
        <input type="email" placeholder="Email Address" />
      </div>

      <div className="input-group">
        <FaLock className="input-icon" />
        <input type="password" placeholder="Password" />
      </div>

      <div className="login-options">
        <a href="#">Forgot Password?</a>
      </div>

      <button type="submit">Login</button>

      <p className="auth-switch">
        Don’t have an account? <a href="/register">Register</a>
      </p>

    </AuthLayout>
  );
};

export default Login;
