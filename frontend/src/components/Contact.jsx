import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import { MdLocationPin, MdCall, MdEmail } from "react-icons/md";
import Navbar from "./HomePage/Navbar";
import axios from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            form_type: "contact"
        };

        try {

            await axios.post("/contact", data);

            toast.success("Message sent successfully!");

            setSubmitted(true);

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });

            setTimeout(() => {
                setSubmitted(false);
            }, 3000);

        } catch (err) {
            console.log(err);
            toast.error("Failed to send message");
        }
    };


    const contactInfo = [
        { icon: MdLocationPin, title: 'Location', detail: 'ABC XYZ Road, Haryana, India' },
        { icon: MdCall, title: 'Phone', detail: '+91 9876543210' },
        { icon: MdEmail, title: 'Email', detail: 'support@audiotyping.com' }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-mesh overflow-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-3xl floating"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-1s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary-600/5 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-2s' }}></div>
            </div>

            <Navbar type="contact" />

            {/* Main Content */}
            <div className="relative pt-24 pb-12 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16 animate-fadeInUp">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            Get In Touch
                            <span className="block mt-2 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">
                                We'd Love to Help
                            </span>
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                            Have questions or feedback? Reach out and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, idx) => {
                            const Icon = info.icon;
                            return (
                                <div
                                    key={idx}
                                    className="glass-card p-8 rounded-3xl text-center hover:glass-light smooth-transition animate-fadeInUp"
                                    style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                                >
                                    <Icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
                                    <p className="text-neutral-400">{info.detail}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form Section */}
                    <div className="max-w-2xl mx-auto">
                        {submitted ? (
                            <div className="glass-card p-12 rounded-3xl text-center bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/50 animate-fadeInUp">
                                <div className="text-5xl mb-4">✓</div>
                                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                                <p className="text-neutral-300">Thank you for reaching out. We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl animate-fadeInUp">
                                <h2 className="text-3xl font-bold text-white mb-8 text-center">Send us a Message</h2>

                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-neutral-300 mb-2">Your Name</label>
                                        <div className="relative">
                                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="input-field pl-12"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-neutral-300 mb-2">Email Address</label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
                                            <input
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input-field pl-12"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-neutral-300 mb-2">
                                            Phone Number
                                        </label>

                                        <div className="relative">
                                            <MdCall className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />

                                            <input
                                                type="tel"
                                                placeholder="+91 9876543210"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                                className="input-field pl-12"
                                                required
                                            />
                                        </div>
                                    </div>


                                    {/* Message Input */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-neutral-300 mb-2">Message</label>
                                        <div className="relative">
                                            <FaCommentDots className="absolute left-4 top-4 text-primary-400" />
                                            <textarea
                                                placeholder="Tell us what's on your mind..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="input-field pl-12 min-h-32 resize-none"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full btn py-4 text-lg font-semibold mt-8 rounded-xl"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
