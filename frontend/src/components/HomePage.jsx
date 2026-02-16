import React from 'react'
import Navbar from './HomePage/Navbar'
import HeroSection from './HomePage/HeroSection'
import About from './HomePage/About'
import ContactArea from './HomePage/ContactArea'
import '../styles/HomePage.css'

const HomePage = () => {
    return (
        <div className='home-bg'>
            <Navbar />
            <HeroSection />
            <About />
            <ContactArea />
        </div>
    )
}

export default HomePage
