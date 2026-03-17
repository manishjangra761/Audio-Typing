import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import axios from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    const handleData = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!data.name.trim()) newErrors.name = "Full name is required";
        if (!data.email.trim()) newErrors.email = "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Invalid email format";
        if (!data.phone.trim()) newErrors.phone = "Phone number is required";
        if (!data.password) newErrors.password = "Password is required";
        if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post("/register", {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            });

            if (response.data) {
                toast.success(response.data.message || "Registration successful!");
                setData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                });
                setTimeout(() => navigate('/login'), 1500);
            }
        }
        catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Registration failed";
            toast.error(errorMessage);
            setErrors({ submit: errorMessage });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout title="Create Account">

            {/* Name Input */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-300">Full Name</label>
                <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 text-sm" />
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        name="name" 
                        value={data.name}
                        onChange={handleData}
                        className="input-field pl-10" 
                    />
                </div>
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
            </div>

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
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-300">Phone Number</label>
                <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 text-sm" />
                    <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        name="phone" 
                        value={data.phone}
                        onChange={handleData}
                        className="input-field pl-10" 
                    />
                </div>
                {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
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
                {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
                <p className="text-xs text-neutral-400">At least 6 characters recommended</p>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-300">Confirm Password</label>
                <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 text-sm" />
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        name="confirmPassword" 
                        value={data.confirmPassword}
                        onChange={handleData}
                        className="input-field pl-10" 
                    />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account...
                    </>
                ) : (
                    <>
                        Create Account
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </>
                )}
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-neutral-400 mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

        </AuthLayout>
    );
};

export default Register;
