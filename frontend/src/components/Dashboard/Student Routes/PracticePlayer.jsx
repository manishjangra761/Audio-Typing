import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../services/api";
import { toast } from "react-toastify";
import {
  FaPlay,
  FaPause,
  FaKeyboard,
  FaCheckCircle,
  FaRedo,
  FaTrophy,
  FaBullseye,
  FaClock,
  FaFileAlt,
  FaLanguage,
  FaMusic
} from "react-icons/fa";

const PracticePlayer = () => {
    const { id } = useParams();

    const [audio, setAudio] = useState(null);
    const [typedText, setTypedText] = useState("");
    const [result, setResult] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAudio = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/audio/get_audio/${id}`);
            setAudio(res.data.audio);
        } catch (err) {
            console.error("Failed to load audio", err);
            toast.error("Failed to load audio");
        } finally {
            setLoading(false);
        }
    }, [id]);

    const addResult = async () => {
        if (!typedText.trim()) {
            toast.warning("Please type something before submitting");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post('/student/add_result', {
                audio_id: id,
                typed_text: typedText
            });

            setResult({
                accuracy: res.data.accuracy,
                score: res.data.score,
                totalWords: res.data.totalWords,
                correctWords: res.data.correctWords,
                wrongWords: res.data.wrongWords
            });
            toast.success(res.data.message);
            setTypedText('');
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit practice");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetPractice = () => {
        setResult(null);
        setTypedText("");
        setIsPlaying(false);
    };

    useEffect(() => {
        getAudio();
    }, [getAudio]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="glass-card p-12 rounded-3xl text-center">
                    <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-white mb-2">Loading Practice Session</h2>
                    <p className="text-neutral-400">Preparing your audio practice...</p>
                </div>
            </div>
        );
    }

    if (!audio) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="glass-card p-12 rounded-3xl text-center">
                    <FaMusic className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-white mb-2">Audio Not Found</h2>
                    <p className="text-neutral-400">The requested audio practice session could not be loaded.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {!result && (
                <div className="space-y-8">
                    {/* Header */}
                    <div className="glass-card p-8 rounded-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <FaKeyboard className="w-8 h-8 text-primary-400" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">{audio.title}</h1>
                                <p className="text-neutral-300 mt-1">
                                    Practice your typing skills with this audio session
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-neutral-300">
                            <span className="flex items-center gap-2">
                                <FaLanguage className="w-4 h-4" />
                                {audio.language}
                            </span>
                            <span className="flex items-center gap-2">
                                <FaClock className="w-4 h-4" />
                                {audio.duration} seconds
                            </span>
                            <span className="flex items-center gap-2">
                                <FaFileAlt className="w-4 h-4" />
                                {audio.Category?.name || 'General'}
                            </span>
                        </div>
                    </div>

                    {/* Audio Player Section */}
                    <div className="glass-card p-8 rounded-3xl">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <FaMusic className="w-5 h-5 text-primary-400" />
                            Audio Playback
                        </h2>

                        <div className="bg-neutral-900/50 rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="btn btn-primary p-3 rounded-xl hover:scale-105 smooth-transition"
                                >
                                    {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
                                </button>
                                <div>
                                    <h3 className="text-white font-medium">Listen & Type</h3>
                                    <p className="text-neutral-400 text-sm">Play the audio and type what you hear</p>
                                </div>
                            </div>

                            <audio
                                controls
                                preload="metadata"
                                className="w-full"
                                src={`${process.env.REACT_APP_BACKEND_SERVER_URL}/${audio.audio_path}`}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                            />
                        </div>
                    </div>

                    {/* Typing Area */}
                    <div className="glass-card p-8 rounded-3xl">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <FaKeyboard className="w-5 h-5 text-primary-400" />
                            Your Typing Area
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-neutral-900/30 rounded-xl border-2 border-dashed border-white/20 p-6">
                                <textarea
                                    rows="8"
                                    value={typedText}
                                    onChange={(e) => setTypedText(e.target.value)}
                                    placeholder="Start typing what you hear from the audio... Focus on accuracy and speed!"
                                    className="w-full bg-transparent border-none outline-none text-white placeholder-neutral-400 text-lg leading-relaxed resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm text-neutral-400">
                                <span>{typedText.length} characters typed</span>
                                <span>{typedText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={addResult}
                            disabled={isSubmitting || !typedText.trim()}
                            className="btn btn-primary px-12 py-4 rounded-xl text-lg font-semibold hover:scale-105 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle className="w-5 h-5" />
                                    Submit Practice
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {result && (
                <div className="space-y-8">
                    {/* Results Header */}
                    <div className="glass-card p-8 rounded-3xl text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <FaTrophy className="w-8 h-8 text-yellow-400" />
                            <h1 className="text-3xl font-bold text-white">Practice Complete!</h1>
                        </div>
                        <p className="text-neutral-300">Great job! Here's how you performed</p>
                    </div>

                    {/* Results Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Accuracy Card */}
                        <div className="glass-card p-6 rounded-3xl text-center">
                            <div className="flex items-center justify-center mb-4">
                                <FaBullseye className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Accuracy</h3>
                            <div className="text-3xl font-bold text-green-400 mb-1">
                                {result.accuracy}%
                            </div>
                            <p className="text-neutral-400 text-sm">Typing precision</p>
                        </div>

                        {/* Score Card */}
                        <div className="glass-card p-6 rounded-3xl text-center">
                            <div className="flex items-center justify-center mb-4">
                                <FaTrophy className="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Score</h3>
                            <div className="text-3xl font-bold text-yellow-400 mb-1">
                                {result.score}
                            </div>
                            <p className="text-neutral-400 text-sm">Performance points</p>
                        </div>

                        {/* Words Card */}
                        <div className="glass-card p-6 rounded-3xl text-center md:col-span-2 lg:col-span-1">
                            <div className="flex items-center justify-center mb-4">
                                <FaFileAlt className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Word Analysis</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-neutral-300">Total:</span>
                                    <span className="text-white font-semibold">{result.totalWords}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-green-400">Correct:</span>
                                    <span className="text-green-400 font-semibold">{result.correctWords}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-red-400">Wrong:</span>
                                    <span className="text-red-400 font-semibold">{result.wrongWords}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Summary */}
                    <div className="glass-card p-8 rounded-3xl">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <FaCheckCircle className="w-5 h-5 text-primary-400" />
                            Performance Summary
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <FaCheckCircle className="w-5 h-5 text-green-400" />
                                        <div>
                                            <p className="text-green-400 font-medium">Correct Words</p>
                                            <p className="text-neutral-300 text-sm">{result.correctWords} out of {result.totalWords}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <FaBullseye className="w-5 h-5 text-red-400" />
                                        <div>
                                            <p className="text-red-400 font-medium">Areas for Improvement</p>
                                            <p className="text-neutral-300 text-sm">{result.wrongWords} words need practice</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                <h4 className="text-blue-400 font-medium mb-3">Tips for Better Performance</h4>
                                <ul className="text-neutral-300 text-sm space-y-2">
                                    <li>• Listen carefully before typing</li>
                                    <li>• Focus on accuracy over speed</li>
                                    <li>• Take breaks if needed</li>
                                    <li>• Practice regularly to improve</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Try Again Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={resetPractice}
                            className="btn btn-secondary px-12 py-4 rounded-xl text-lg font-semibold hover:scale-105 smooth-transition flex items-center gap-2"
                        >
                            <FaRedo className="w-5 h-5" />
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticePlayer;
