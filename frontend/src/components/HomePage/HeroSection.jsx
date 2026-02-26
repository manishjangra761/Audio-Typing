import React from 'react'
// import HeroImage from '../../assets/hero.png'
import '../../styles/HeroSection.css'

const HeroSection = () => {
    return (
        <div className='hero'>
            <div className='hero-text-heading'>
                <h1>Boost Your Typing Skills with <span className='hero-text-highlight'>Real Audio Tests</span></h1>
                <p>Practice typing from real exam-style audio to enhance speed, accuracy, confidence</p>
                <button>Start Practice</button>
            </div>
            {/* <img alt="hero image" /> */}
            {/* <img src={HeroImage} alt="hero image" /> */}
            <div className='hero-text hero-blur'>
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
