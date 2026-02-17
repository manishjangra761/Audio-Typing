import React from "react";
import "../styles/AboutPage.css";
import Navbar from "./HomePage/Navbar";

const AboutPage = () => {
  return (
      <div className="about-page">
        <Navbar />
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>About Audio Typing</h1>
          <p>Practice smart. Type faster. Succeed confidently.</p>
          <button className="cta-btn">Start Practicing Now</button>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section who">
        <div className="who-text">
          <h2>Who We Are</h2>
          <p>
            Audio Typing is a smart learning platform designed to help students
            improve typing speed, listening ability, and accuracy through real
            exam-style audio typing practice.
          </p>

          <div className="who-icons">
            <div>🎧 Real exam environment</div>
            <div>⏱️ Single-play audio</div>
            <div>📈 Performance tracking</div>
          </div>
        </div>

        <div className="who-image">
          <img src="/assets/bg.png" alt="typing practice" />
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section offer">
        <h2>What We Offer</h2>

        <div className="card-grid">
          <div className="feature-card">🎯 Real Exam Simulation</div>
          <div className="feature-card">📊 Speed Tracking</div>
          <div className="feature-card">🌐 Hindi & English Support</div>
          <div className="feature-card">⚡ Instant Analysis</div>
          <div className="feature-card">🎧 Single-Play Audio</div>
          <div className="feature-card">🧠 Focus Improvement</div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section mission-vision">
        <div className="mv-card mission">
          <h3>🚀 Our Mission</h3>
          <p>
            To make audio typing preparation simple, effective, and accessible
            for every competitive exam student.
          </p>
        </div>

        <div className="mv-card vision">
          <h3>👁️ Our Vision</h3>
          <p>
            To build a trusted platform that bridges the gap between practice
            and real exams through realistic preparation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bottom-cta">
        <h2>Ready to improve your typing?</h2>
        <button className="cta-btn">Try Free Practice</button>
      </section>

    </div>
  );
};

export default AboutPage;
