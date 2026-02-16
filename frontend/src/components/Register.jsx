
import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import AuthLayout from "./AuthLayout";

const Register = () => {
    return (
        <AuthLayout title="Create Account">

            <div className="input-group">
                <FaUser className="input-icon" />
                <input type="text" placeholder="Full Name" />
            </div>

            <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Email Address" />
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Password" />
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Confirm Password" />
            </div>

            <button type="submit">Register</button>

            <p className="auth-switch">
                Already have an account? <a href="/login">Login</a>
            </p>

        </AuthLayout>
    );
};

export default Register;
