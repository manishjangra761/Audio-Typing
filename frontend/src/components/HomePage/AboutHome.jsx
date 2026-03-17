import React from 'react';
import { FaBullseye, FaLightbulb, FaGraduationCap, FaMagic } from 'react-icons/fa';

const AboutHome = () => {
    const features = [
        {
            icon: FaGraduationCap,
            title: "Real Exam-Style Practice",
            description: "Simulates exact competitive exam environment"
        },
        {
            icon: FaMagic,
            title: "Real-Time Analytics",
            description: "Get intelligent insights on your performance"
        },
        {
            icon: FaLightbulb,
            title: "Smart Learning",
            description: "Personalized recommendations for improvement"
        },
        {
            icon: FaBullseye,
            title: "Track Progress",
            description: "Measure your improvement with detailed metrics"
        }
    ];

    return (
        <section className="w-full px-4 md:px-8 lg:px-12 py-20 md:py-32 space-y-16">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center space-y-4 animate-fadeInUp">
                <h2 className="text-5xl md:text-6xl font-bold text-white">
                    About Audio Typing
                </h2>
                <p className="text-xl text-neutral-300 leading-relaxed">
                    Master your audio typing skills with our intelligent platform designed for competitive exam preparation
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto space-y-12">
                
                {/* What We Offer */}
                <div className="glass-card p-8 md:p-12 rounded-3xl space-y-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">What We Offer</h3>
                        <p className="text-neutral-300 leading-relaxed">
                            Audio Typing is a smart, intelligent platform designed to help students master their typing speed, listening skills, and accuracy through real exam-style audio tests. We bridge the gap between practice and competitive exams with a realistic, accessible learning environment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                        {[
                            "Real exam-style audio typing practice",
                            "Advanced speed and performance tracking",
                            "Multi-language support (Hindi & English)",
                            "Fair testing with single-play audio",
                            "Live mistake analysis",
                            "Concentration & listening skill development"
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                                </div>
                                <span className="text-neutral-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div 
                                key={idx}
                                className="glass-card p-8 rounded-2xl space-y-3 hover:glass-light smooth-transition group animate-fadeInUp"
                                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/40 smooth-transition">
                                    <Icon className="w-6 h-6 text-primary-400 group-hover:text-primary-300" />
                                </div>
                                <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
                                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Our Vision */}
                <div className="glass-card p-8 md:p-12 rounded-3xl space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Our Vision</h3>
                    <div className="space-y-4 text-neutral-300 leading-relaxed">
                        <p>
                            We aim to create a powerful and accessible learning platform that helps every student master audio typing skills with unwavering confidence.
                        </p>
                        <p>
                            Our mission is to bridge the gap between practice and real competitive exams by providing a realistic, intelligent, and effective preparation environment that empowers students to succeed.
                        </p>
                        <p className="text-primary-400 font-semibold pt-2">
                            "Practice smart. Type faster. Succeed confidently."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;
