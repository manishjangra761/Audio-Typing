import React, { useEffect, useState, useCallback } from "react";
import axios from "../../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChartLine, FaEye, FaCalendarAlt, FaTrophy, FaBullseye, FaClock } from "react-icons/fa";

const ResultPage = () => {
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const isHistoryPage = location.pathname.includes("history");

    const getResults = useCallback(async () => {
        try {
            let res;
            if (isHistoryPage) {
                res = await axios.get("/student/get_result");
            } else {
                res = await axios.get("/student/get_result?unique=true");
            }
            setResults(res.data.attempts || []);
        } catch (err) {
            console.error("Failed to load results", err);
        }
    }, [isHistoryPage]);

    useEffect(() => {
        getResults();
    }, [location.pathname, getResults]);

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
        <div className="space-y-8">
            {/* Header */}
            <div className="glass-card p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                    <FaChartLine className="w-8 h-8 text-primary-400" />
                    <h1 className="text-3xl font-bold text-white">
                        {isHistoryPage ? "Performance History" : "My Practice Results"}
                    </h1>
                </div>
                <p className="text-neutral-300">
                    {isHistoryPage
                        ? "View your complete practice history and track your improvement over time"
                        : "Review your latest practice session results and performance metrics"
                    }
                </p>
            </div>

            {/* Results Grid */}
            {results.length === 0 ? (
                <div className="glass-card p-12 rounded-3xl text-center">
                    <FaTrophy className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Results Yet</h3>
                    <p className="text-neutral-400">
                        Start practicing to see your results here!
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((result, index) => (
                        <div
                            key={result.id}
                            className="glass-card p-6 rounded-2xl hover:glass-light smooth-transition group animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Audio Title */}
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 line-clamp-2">
                                    {result["Audio.title"]}
                                </h3>
                                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                                    <FaBullseye className="w-5 h-5 text-primary-400" />
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaTrophy className="w-4 h-4 text-neutral-400" />
                                        <span className="text-neutral-400 text-sm">Accuracy</span>
                                    </div>
                                    <span className={`font-bold text-lg ${getAccuracyColor(result.accuracy)}`}>
                                        {result.accuracy}%
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FaChartLine className="w-4 h-4 text-neutral-400" />
                                        <span className="text-neutral-400 text-sm">Score</span>
                                    </div>
                                    <span className={`font-bold text-lg ${getScoreColor(result.score)}`}>
                                        {result.score}
                                    </span>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-center gap-2 text-neutral-400 text-sm mb-4">
                                <FaCalendarAlt className="w-4 h-4" />
                                <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                                <FaClock className="w-4 h-4 ml-2" />
                                <span>{new Date(result.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() =>
                                    navigate(
                                        isHistoryPage
                                            ? `/student/history/${result.id}`
                                            : `/student/results/${result.id}`,
                                        { state: result }
                                    )
                                }
                                className="w-full btn btn-primary py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-105 smooth-transition"
                            >
                                <FaEye className="w-4 h-4" />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Summary Stats */}
            {results.length > 0 && (
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold text-white mb-4">Summary Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-400">
                                {results.length}
                            </div>
                            <div className="text-neutral-400 text-sm">Total Attempts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                                {Math.round(results.reduce((acc, r) => acc + r.accuracy, 0) / results.length)}%
                            </div>
                            <div className="text-neutral-400 text-sm">Avg Accuracy</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">
                                {Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)}
                            </div>
                            <div className="text-neutral-400 text-sm">Avg Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">
                                {Math.max(...results.map(r => r.accuracy))}%
                            </div>
                            <div className="text-neutral-400 text-sm">Best Accuracy</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
