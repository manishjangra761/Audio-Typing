import React from 'react';
import '../../styles/AboutHome.css';

const AboutHome = () => {
    return (
        <div className="about">
            <h1 className="about-heading">About Audio Typing</h1>

            <section className="about-para">
                <p>
                    <b>Audio Typing</b> is a smart platform designed to help students improve their typing speed,
                    listening skills, and accuracy through real exam-style audio tests.
                </p>

                <p>
                    Our system simulates the exact environment of competitive typing exams, where users listen to audio and type without repetition — just like in real tests.
                </p>

                <p>
                    We aim to make preparation simple, effective, and accessible for everyone preparing for government and competitive exams.
                    With instant result analysis, performance tracking, and realistic practice sessions, Audio Typing helps users identify mistakes, measure progress, and build confidence.
                </p>

                <p><b>Practice smart. Type faster. Succeed confidently.</b></p>
                {/* <br></br> */}
                <b>What We Offer</b>
                <ul className="about-unorder-list">
                    <li>Real exam-style audio typing practice</li>
                    <li>Speed and performance tracking</li>
                    <li>Hindi and English typing support</li>
                    <li>Fair testing with single-play audio</li>
                    <li>Tools to improve concentration and listening ability</li>
                </ul>
                {/* <br></br> */}
                <b>Our Vision</b>
                <p>
                    Our vision is to create a powerful and accessible learning platform that helps students master audio typing skills with confidence.
                </p>

                <p>
                    We aim to bridge the gap between practice and real competitive exams by providing a realistic, smart, and effective preparation environment.
                </p>
            </section>
        </div>
    );
};

export default AboutHome;
