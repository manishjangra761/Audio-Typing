import React from 'react'
import HeroImage from '../assets/hero.png'
import '../styles/HeroSection.css'

const HeroSection = () => {
    return (
        <div className='hero'>
            <img src={HeroImage} alt="hero image" />
            <div className='hero-text'>
                <h2>Why Audio Typing ?</h2>
                <li>Real exam-like audio typing practice</li>
                <li>Improves typing speed and accuracy</li>
                <li>Instant result with accuracy check</li>
                <li>Audio plays once for fair testing</li>
                <li>Useful for competitive exam preparation</li>
                <li>Helps improve concentration and listening skills</li>
            </div>
        </div >
    )
}




export default HeroSection
