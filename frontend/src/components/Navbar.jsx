import React from 'react'
import '../styles/global.css'
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <a href="/"><img src="/assets/logo.png" alt="Audio Typing Logo" /></a>

            </div>

            <div className='header'>
                <ul className='header-elements'><a href="/home" className='header-link'>Home</a></ul>
                <ul className='header-elements'><a href="/register" className='header-link'>Register</a></ul>
                <ul className='header-elements'><a href="/login" className='header-link'>Login</a></ul>
                <ul className='header-elements'><a href="/about" className='header-link'>About Us</a></ul>
                <ul className='header-elements'><a href="/contact" className='header-link'>Contact</a></ul>
            </div>
        </nav>
    )
}

export default Navbar
