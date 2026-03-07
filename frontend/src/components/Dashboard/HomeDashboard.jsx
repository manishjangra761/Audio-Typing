import React from 'react'
import { FaBook, FaClipboardCheck, FaTrophy, FaLightbulb } from 'react-icons/fa'

const HomeDashboard = () => {
    const guidelines = [
        {
            icon: FaBook,
            title: "Focus on Audio",
            description: "Listen carefully to each word in the audio dictation before typing"
        },
        {
            icon: FaClipboardCheck,
            title: "One Attempt",
            description: "The audio plays only once - there's no repetition, just like in real exams"
        },
        {
            icon: FaTrophy,
            title: "Instant Feedback",
            description: "Get immediate results showing your accuracy, speed, and specific mistakes"
        },
        {
            icon: FaLightbulb,
            title: "Smart Corrections",
            description: "Learn from detailed analysis of punctuation, spelling, and formatting errors"
        }
    ];

    return (
        <>
            <div className="space-y-12">
                {/* Welcome Header */}
                <div className="glass-card p-8 md:p-12 rounded-3xl space-y-4 animate-fadeInUp">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-white">
                                Welcome to Your Dashboard
                            </h1>
                            <p className="text-neutral-300 text-lg">
                                Master your audio typing skills with intelligent practice and detailed feedback
                            </p>
                        </div>
                        <div className="hidden md:block text-6xl">📚</div>
                    </div>
                </div>

                {/* Key Guidelines */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">Essential Guidelines</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {guidelines.map((guide, idx) => {
                            const Icon = guide.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="glass-card p-6 rounded-2xl space-y-3 hover:glass-light smooth-transition group animate-fadeInUp"
                                    style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/40 smooth-transition">
                                        <Icon className="w-6 h-6 text-primary-400 group-hover:text-primary-300" />
                                    </div>
                                    <h3 className="font-semibold text-white">{guide.title}</h3>
                                    <p className="text-neutral-400 text-sm">{guide.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Start */}
                <div className="glass-card p-8 md:p-12 rounded-3xl space-y-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                    <h2 className="text-2xl font-bold text-white">Quick Start</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "1",
                                title: "Choose a Test",
                                description: "Select from our library of exam-style typing tests"
                            },
                            {
                                step: "2",
                                title: "Listen & Type",
                                description: "Listen carefully and type the audio content without pausing"
                            },
                            {
                                step: "3",
                                title: "Review & Learn",
                                description: "Get instant feedback and detailed analytics on your performance"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">{item.step}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                </div>
                                <p className="text-neutral-400 ml-16">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Notes */}
                <div className="glass-card p-8 rounded-2xl space-y-4 border-l-4 border-accent-500 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                    <h3 className="text-lg font-semibold text-white">Important Information <span className="ml-2">⚠️</span></h3>
                    <div className="space-y-2 text-neutral-300 text-sm">
                        <p>• Internet connection is required for practicing dictation tests</p>
                        <p>• Audio plays only once - pay close attention from the start</p>
                        <p>• Tests are timed for fair evaluation matching real exam conditions</p>
                        <p>• After submitting a test, automatic evaluation provides instant results</p>
                        <p>• Special characters and coding for Hindi Steno follow official standards</p>
                        <p>• Progress tracking helps you monitor improvement over time</p>
                    </div>
                </div>

                {/* Need Help */}
                <div className="glass-card p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 space-y-4 text-center animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
                    <h3 className="text-2xl font-bold text-white">Need Help?</h3>
                    <p className="text-neutral-300">Explore docs or contact support if you need assistance.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <a href="/docs" className="btn-secondary px-6 py-2 rounded-lg font-semibold">View Documentation</a>
                        <a href="/support" className="btn px-6 py-2 rounded-lg font-semibold">Contact Support</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeDashboard
