import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import axios from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    let [message, setMessage] = useState()

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match")
            return;
        }

        await axios.post("/register", data)
            .then((res) => {
                toast.success(res.data.message);
                setData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                })
            })
            .catch((err) => {
                setMessage(err.response.data.message)
            })
    };

    message && setTimeout(() => {
        setMessage("")
    }, 10000)

    return (
        <AuthLayout title="Create Account">
            {message && <p className="message">{message}</p>}
            <div className="input-group">
                <FaUser className="input-icon" />
                <input type="text" placeholder="Full Name" name="name" onChange={handleData} />
            </div>

            <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Email Address" name="email" onChange={handleData} />
            </div>

            <div className="input-group">
                <FaPhone className="input-icon" />
                <input type="phone" placeholder="Phone Number" name="phone" onChange={handleData} />
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Password" name="password" onChange={handleData} />
            </div>

            <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleData} />
            </div>

            <button type="submit" onClick={handleSubmit}>Register</button>

            <p className="auth-switch">
                Already have an account? <a href="/login">Login</a>
            </p>

        </AuthLayout>
    );
};

export default Register;
