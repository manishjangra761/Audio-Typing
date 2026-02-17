import React from 'react'
import Navbar from './HomePage/Navbar'
import HeroSection from './HomePage/HeroSection'
import ContactArea from './HomePage/ContactArea'
import '../styles/HomePage.css'
import AboutHome from './HomePage/AboutHome'

const HomePage = () => {
    return (
        <div className='home-bg'>
            <Navbar />
            <HeroSection />
            <AboutHome />
            <ContactArea />
        </div>
    )
}

export default HomePage
