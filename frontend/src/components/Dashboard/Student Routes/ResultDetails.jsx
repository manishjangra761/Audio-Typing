import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileAudio, FaTrophy, FaChartLine, FaCheckCircle, FaTimesCircle, FaKeyboard, FaCalendarAlt, FaClock } from "react-icons/fa";

const ResultDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state;

    if (!result) {
        return (
            <div className="space-y-8">
                <div className="glass-card p-8 rounded-3xl text-center">
                    <FaFileAudio className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Result Not Found</h1>
                    <p className="text-neutral-400 mb-6">
                        The result you're looking for doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-primary px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 90) return "text-green-400";
        if (accuracy >= 70) return "text-yellow-400";
        return "text-red-400";
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="btn-secondary px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 smooth-transition"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Back to Results
                </button>
            </div>

            {/* Title Section */}
            <div className="glass-card p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                    <FaFileAudio className="w-8 h-8 text-primary-400" />
                    <div>
                        <h1 className="text-3xl font-bold text-white">Result Details</h1>
                        <p className="text-neutral-300 mt-1">
                            Detailed analysis of your practice session
                        </p>
                    </div>
                </div>

                {/* Audio Info */}
                <div className="bg-white/5 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <FaFileAudio className="w-5 h-5 text-primary-400" />
                        Audio Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-neutral-400 text-sm">Audio Title</p>
                            <p className="text-white font-medium">{result["Audio.title"]}</p>
                        </div>
                        <div>
                            <p className="text-neutral-400 text-sm">Attempt Type</p>
                            <p className="text-white font-medium capitalize">{result.attempt_type}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Accuracy */}
                <div className="glass-card p-6 rounded-2xl text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                        <FaTrophy className="w-8 h-8 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Accuracy</h3>
                    <p className={`text-3xl font-bold ${getAccuracyColor(result.accuracy)}`}>
                        {result.accuracy}%
                    </p>
                    <p className="text-neutral-400 text-sm mt-1">
                        {result.accuracy >= 90 ? "Excellent!" : result.accuracy >= 70 ? "Good job!" : "Keep practicing!"}
                    </p>
                </div>

                {/* Score */}
                <div className="glass-card p-6 rounded-2xl text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                        <FaChartLine className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Score</h3>
                    <p className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}
                    </p>
                    <p className="text-neutral-400 text-sm mt-1">
                        Performance rating
                    </p>
                </div>

                {/* Words Stats */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FaKeyboard className="w-5 h-5 text-green-400" />
                        Word Analysis
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-neutral-400">Correct</span>
                            </div>
                            <span className="text-green-400 font-semibold">{result.correct_words}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaTimesCircle className="w-4 h-4 text-red-400" />
                                <span className="text-neutral-400">Wrong</span>
                            </div>
                            <span className="text-red-400 font-semibold">{result.wrong_words}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Typed Text */}
            <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <FaKeyboard className="w-6 h-6 text-primary-400" />
                    Your Typed Text
                </h3>

                <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-700">
                    <div
                        className="text-white font-mono text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: result?.typed_text || "No typed text available"
                        }}
                    />
                </div>
            </div>



            {/* Timestamp */}
            <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-center gap-6 text-neutral-400">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4" />
                        <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock className="w-4 h-4" />
                        <span>{new Date(result.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultDetails;
