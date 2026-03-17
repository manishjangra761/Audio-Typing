import React from 'react'
import { FaPlay, FaCheckCircle, FaChartLine, FaMicrophone } from 'react-icons/fa'

const HeroSection = () => {
    return (
        <section className='w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 py-20 pt-32 relative overflow-hidden'>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-screen filter blur-3xl floating"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-1s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-primary-600/5 rounded-full mix-blend-screen filter blur-3xl floating" style={{ animationDelay: '-2s' }}></div>
            </div>

            <div className="max-w-6xl mx-auto w-full">
                {/* Main Hero Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeInUp">
                    
                    {/* Left Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 badge badge-primary">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 animate-pulse"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
                            </span>
                            <span>Test your skills with us</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                                Master Audio
                                <span className="block mt-2 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">
                                    Typing Skills
                                </span>
                            </h1>
                            <p className="text-xl text-neutral-300 leading-relaxed max-w-xl">
                                Practice with real exam-style audio transcription. Get instant feedback, track your progress, and ace your stenography tests with confidence.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="/login" className="btn px-8 py-4 flex items-center justify-center gap-3 rounded-xl text-lg font-bold">
                                <FaPlay className="w-5 h-5" />
                                Start Practicing
                            </a>
                            <a href="/about" className="btn-ghost px-8 py-4 flex items-center justify-center gap-3 rounded-xl text-lg font-bold">
                                Learn More
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-neutral-950 flex items-center justify-center text-white text-sm font-bold">
                                        {i}K+
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-semibold">2,500+ Students</p>
                                <p className="text-neutral-400 text-sm">Already improved their skills</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Features Grid */}
                    <div className="grid grid-cols-2 gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        {[
                            { icon: FaMicrophone, title: "Real Audio Tests", desc: "Exam-style practice" },
                            { icon: FaCheckCircle, title: "Instant Feedback", desc: "Know your mistakes" },
                            { icon: FaChartLine, title: "Progress Tracking", desc: "See your improvement" },
                            { icon: "⚡", title: "AI Analytics", desc: "Smart suggestions" }
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            const isIcon = typeof Icon === 'function';
                            return (
                                <div 
                                    key={idx}
                                    className="glass-card p-6 rounded-2xl space-y-3 hover:glass-light smooth-transition hover:translate-y-2"
                                    style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                                >
                                    <div className="text-3xl">
                                        {isIcon ? <Icon className="w-8 h-8 text-primary-400" /> : Icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                                        <p className="text-xs text-neutral-400">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-20 border-t border-white/10">
                    {[
                        { number: "150+", label: "Quality Tests" },
                        { number: "98%", label: "Accuracy Rate" },
                        { number: "2.5K", label: "Active Users" },
                        { number: "4.9★", label: "Rating" }
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-2xl text-center space-y-2 animate-fadeInUp" style={{ animationDelay: `${0.4 + idx * 0.1}s` }}>
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                {stat.number}
                            </div>
                            <p className="text-neutral-400 text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection
