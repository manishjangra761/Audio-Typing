import React from "react";
import "../styles/AboutPage.css";
import Navbar from "./HomePage/Navbar";
import { FaHeadphones, FaChartLine, FaGlobe, FaBolt, FaMicrophone, FaBrain, FaArrowRight } from "react-icons/fa";

const AboutPage = () => {
  return (
      <div className="about-page">
        <Navbar type='homepage'/>
      <div className="w-full min-h-screen bg-gradient-mesh overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-3xl floating"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-1s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary-600/5 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-2s' }}></div>
        </div>

        <Navbar type='homepage'/>

        {/* Main Content */}
        <div className="relative pt-24 pb-12 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">

            {/* Hero Section */}
            <section className="text-center mb-20 animate-fadeInUp">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                About Audio Typing
                <span className="block mt-3 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">
                  Master Stenography with Us
                </span>
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8">
                Practice smart. Type faster. Succeed confidently.
              </p>
              <a href="/register" className="btn px-8 py-4 inline-flex items-center gap-2 rounded-xl text-lg">
                Start Practice <FaArrowRight className="w-4 h-4" />
              </a>
            </section>

            {/* Who We Are Section */}
            <section className="mb-20">
              <div className="glass-card p-12 rounded-3xl animate-fadeInUp">
                <h2 className="text-4xl font-bold text-white mb-6">Who We Are</h2>
                <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                  Audio Typing is a smart learning platform designed to help students improve typing speed, 
                  listening ability, and accuracy through real exam-style audio typing practice. We combine 
                  cutting-edge technology with proven learning methodologies to deliver the best competitive experience.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass p-6 rounded-2xl text-center hover:glass-light smooth-transition">
                    <FaHeadphones className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Real Exam Environment</h4>
                    <p className="text-sm text-neutral-400">Authentic test conditions</p>
                  </div>
                  <div className="glass p-6 rounded-2xl text-center hover:glass-light smooth-transition">
                    <FaMicrophone className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Single-Play Audio</h4>
                    <p className="text-sm text-neutral-400">Just like real exams</p>
                  </div>
                  <div className="glass p-6 rounded-2xl text-center hover:glass-light smooth-transition">
                    <FaChartLine className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Performance Tracking</h4>
                    <p className="text-sm text-neutral-400">Real-time analytics</p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Offer Section */}
            <section className="mb-20">
              <h2 className="text-4xl font-bold text-white mb-10 text-center">What We Offer</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: FaBolt, title: 'Real Exam Simulation', desc: 'Practice with actual exam patterns' },
                  { icon: FaChartLine, title: 'Speed Tracking', desc: 'Monitor your WPM progress' },
                  { icon: FaGlobe, title: 'Hindi & English', desc: 'Support for multiple languages' },
                  { icon: FaBolt, title: 'Instant Analysis', desc: 'Get immediate feedback' },
                  { icon: FaMicrophone, title: 'Single-Play Audio', desc: 'No replays allowed' },
                  { icon: FaBrain, title: 'Focus Improvement', desc: 'Sharpen your concentration' }
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="glass-card p-8 rounded-2xl hover:glass-light smooth-transition animate-fadeInUp text-center"
                      style={{ animationDelay: `${0.05 * idx}s` }}
                    >
                      <Icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-neutral-400">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="glass-card p-10 rounded-3xl hover:glass-light smooth-transition animate-fadeInUp">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-neutral-300 leading-relaxed">
                  To make audio typing preparation simple, effective, and accessible for every competitive 
                  exam student worldwide. We're committed to removing barriers and enabling success.
                </p>
              </div>

              <div className="glass-card p-10 rounded-3xl hover:glass-light smooth-transition animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-neutral-300 leading-relaxed">
                  To build a trusted platform that bridges the gap between practice and real exams through 
                  realistic preparation, and community support.
                </p>
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="text-center py-16 glass-card rounded-3xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/50 animate-fadeInUp">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Improve Your Typing?</h2>
              <p className="text-lg text-neutral-300 mb-8">Join thousands of students mastering stenography</p>
              <a href="/register" className="btn px-8 py-4 inline-flex items-center gap-2 rounded-xl text-lg">
              Want to Explore <FaArrowRight className="w-4 h-4" />
              </a>
            </section>

          </div>
        </div>
    </div>
  </div>
  );
};

export default AboutPage;
