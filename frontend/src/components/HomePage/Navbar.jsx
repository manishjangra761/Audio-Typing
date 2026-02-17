import React from 'react'
import '../../styles/global.css'
import '../../styles/Navbar.css'
import Register from '../Register'

const Navbar = ({type}) => {
    return (
        <nav className={` ${type === "homepage" ? "navbar overlay" : "navbar-overlay overlay"}`}>
            <div className='logo'>
                <a href="/"><img src="/assets/logo.png" alt="Audio Typing Logo" /></a>

            </div>

            {/* <div className='header'>
                <ul className='header-elements overlay-elements'><a href="/home" className='header-link'>Home</a></ul>
                <ul className='header-elements overlay-elements'><a href="/register" className='header-link'>Register</a></ul>
                <ul className='header-elements overlay-elements'><a href="/login" className='header-link'>Login</a></ul>
                <ul className='header-elements overlay-elements'><a href="/about" className='header-link'>About Us</a></ul>
                <ul className='header-elements overlay-elements'><a href="/contact" className='header-link'>Contact</a></ul>
            </div> */}

            <div className="header">
                <ul className="header-list">
                    <a href="/" className="header-link">
                        <li className="header-elements overlay-elements">
                            Home
                        </li>
                    </a>

                    <a href="/register" className="header-link">
                        <li className="header-elements overlay-elements">
                            Register
                        </li>
                    </a>

                    <a href="/login" className="header-link">
                        <li className="header-elements overlay-elements">
                            Login
                        </li>
                    </a>

                    <a href="/about" className="header-link">
                        <li className="header-elements overlay-elements">
                            About Us
                        </li>
                    </a>

                    <a href="/contact" className="header-link">
                        <li className="header-elements overlay-elements">
                            Contact
                        </li>
                    </a>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
