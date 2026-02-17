import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="page-bg">

      <div className="about-container">

        <h1 className="about-title">About Audio Typing</h1>
        <p className="about-subtitle">
          Practice smart. Type faster. Succeed confidently.
        </p>

        {/* Who we are */}
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            <b>Audio Typing</b> is a smart learning platform designed to help
            students improve typing speed, listening ability, and accuracy through
            real exam-style audio typing practice.
          </p>
          <p>
            Our platform recreates the real competitive exam environment where
            users listen once and type — helping them build focus, confidence,
            and real exam readiness.
          </p>
        </section>

        {/* What we offer */}
        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Real exam-style audio typing practice</li>
            <li>Single-play audio for fair testing</li>
            <li>Speed and performance tracking</li>
            <li>Instant result analysis & accuracy reports</li>
            <li>Hindi and English typing support</li>
            <li>Tools to improve focus and listening skills</li>
          </ul>
        </section>

        {/* Mission */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make audio typing preparation simple, effective,
            and accessible for every student preparing for competitive exams.
          </p>
        </section>

        {/* Vision */}
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            We aim to create a powerful and trusted learning platform that bridges
            the gap between practice and real exams by providing a realistic,
            smart, and effective preparation environment.
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
