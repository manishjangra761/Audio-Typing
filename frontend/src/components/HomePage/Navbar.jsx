import React from 'react'
import '../../styles/global.css'
import '../../styles/Navbar.css'
import Register from '../Register'

const Navbar = ({type}) => {
    // use explicit class names so styles don't leak into other components
    const baseClass = type === "homepage" ? "navbar navbar-blur" : "navbar-overlay navbar-blur";
    return (
        <nav className={baseClass}>
            <div className='navbar-logo'>
                <a href="/"><img src="/assets/logo.png" alt="Audio Typing Logo" /></a>
            </div>

            <div className="navbar-items">
                <ul className="navbar-list">
                    <a href="/" className="navbar-link">
                        <li className="navbar-item navbar-button">
                            Home
                        </li>
                    </a>

                    <a href="/register" className="navbar-link">
                        <li className="navbar-item navbar-button">
                            Register
                        </li>
                    </a>

                    <a href="/login" className="navbar-link">
                        <li className="navbar-item navbar-button">
                            Login
                        </li>
                    </a>

                    <a href="/about" className="navbar-link">
                        <li className="navbar-item navbar-button">
                            About Us
                        </li>
                    </a>

                    <a href="/contact" className="navbar-link">
                        <li className="navbar-item navbar-button">
                            Contact
                        </li>
                    </a>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
