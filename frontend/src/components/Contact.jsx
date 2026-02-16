import React from "react";
import "../styles/Contact.css";
import { FaUser, FaEnvelope, FaCommentDots, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="contact-bg">

            <div className="contact-layout">

                {/* LEFT SIDE INFO */}
                <div className="contact-left">
                    <h1>Contact Us</h1>
                    <p>
                        Have questions or feedback? We’d love to hear from you.
                        Reach out and our team will get back to you soon.
                    </p>

                    <div className="contact-info">
                        <p><FaMapMarkerAlt /> ABC XYZ Road, Haryana, India</p>
                        <p><FaPhone /> +91 9876543210</p>
                        <p><FaEnvelope /> support@audiotyping.com</p>
                    </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <div className="contact-form-container">
                    <form className="contact-form">
                        <h2>Send Message</h2>

                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input type="text" placeholder="Your Name" />
                        </div>

                        <div className="input-group">
                            <FaEnvelope className="input-icon" />
                            <input type="email" placeholder="Email Address" />
                        </div>

                        <div className="input-group textarea-group">
                            <FaCommentDots className="input-icon" />
                            <textarea placeholder="Your Message"></textarea>
                        </div>


                        <button type="submit">Send Message</button>

                    </form>
                </div>

            </div>

        </div>
    );
};

export default Contact;
