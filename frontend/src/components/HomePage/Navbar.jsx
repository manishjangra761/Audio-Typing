import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaArrowRight } from 'react-icons/fa'

const Navbar = ({ type }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 smooth-transition ${
      scrolled 
        ? 'glass-elevated backdrop-blur-xl border-b border-white/10 py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center transform group-hover:scale-110 smooth-transition">
            <span className="text-white font-bold">📚</span>
          </div>
          <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
            Audio Typing
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:glass smooth-transition font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="px-6 py-2 rounded-lg text-white border border-white/20 hover:border-primary-500 hover:text-primary-400 smooth-transition font-semibold"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="btn px-6 py-2 flex items-center gap-2 font-semibold"
          >
            Get Started
            <FaArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden glass px-3 py-2 rounded-lg text-white"
        >
          {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-950/95 backdrop-blur-xl border-t border-white/10 p-4 space-y-3 animate-fadeInDown">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:glass smooth-transition font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
            <a
              href="/login"
              className="px-4 py-3 rounded-lg text-center text-white border border-white/20 hover:border-primary-500 smooth-transition font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </a>
            <a
              href="/register"
              className="btn px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
              <FaArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
