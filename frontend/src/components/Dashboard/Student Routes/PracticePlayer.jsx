import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../services/api";
import { toast } from "react-toastify";

const PracticePlayer = () => {
    const { id } = useParams();

    const [audio, setAudio] = useState(null);
    const [typedText, setTypedText] = useState("");
    const [result, setResult] = useState();

    const getAudio = useCallback(async () => {
        try {
            const res = await axios.get(`/audio/get_audio/${id}`);
            setAudio(res.data.audio);
        } catch (err) {
            console.error("Failed to load audio", err);
        }
    }, [id]);

    const addResult = () => {
        axios.post('/student/add_result', {
            audio_id: id,
            typed_text: typedText
        }).then((res) => {
            console.log(res);
            setResult({
                accuracy: res.data.accuracy,
                score: res.data.score,
                totalWords: res.data.totalWords,
                correctWords: res.data.correctWords,
                wrongWords: res.data.wrongWords
            });
            toast.success(res.data.message);
            setTypedText('');
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        getAudio();
    }, [getAudio]);

    if (!audio) return <p className="text-white">Loading...</p>;

    return (
        <div className="space-y-8">
            {!result && <div className="space-y-8">

                {/* Audio Info */}
                <div>
                    <h1 className="text-3xl font-bold text-white">{audio.title}</h1>
                    <p className="text-neutral-400">
                        Language: {audio.language}
                    </p>
                </div>

                {/* Audio Player */}
                <div className="glass-card p-6 rounded-2xl">
                    <audio
                        controls
                        preload="metadata"
                        className="w-full"
                        src={`${process.env.REACT_APP_BACKEND_SERVER_URL}/${audio.audio_path}`}
                    />
                </div>


                {/* Typing Area */}
                <div className="glass-card p-6 rounded-2xl">
                    <textarea
                        rows="10"
                        value={typedText}
                        onChange={(e) => setTypedText(e.target.value)}
                        placeholder="Start typing what you hear..."
                        className="w-full bg-transparent border border-white/20 p-4 rounded-xl text-white"
                    />
                </div>

                {/* Submit Button */}
                <button onClick={addResult} className="btn btn-primary px-6 py-3 rounded-xl">
                    Submit Practice
                </button>

            </div>}

            {result && (
                <div className="space-y-8">
                    <h1 className="text-3xl font-bold text-white">Practice Result</h1>

                    <div className="glass-card p-6 rounded-2xl text-white space-y-3">

                        <p>
                            <span className="font-semibold">Accuracy:</span> {result.accuracy}%
                        </p>

                        <p>
                            <span className="font-semibold">Score:</span> {result.score}
                        </p>

                        <p>
                            <span className="font-semibold">Total Words:</span> {result.totalWords}
                        </p>

                        <p>
                            <span className="font-semibold">Correct Words:</span> {result.correctWords}
                        </p>

                        <p>
                            <span className="font-semibold">Wrong Words:</span> {result.wrongWords}
                        </p>

                    </div>
                    <button
                        onClick={() => setResult(null)}
                        className="btn btn-secondary px-6 py-3 rounded-xl"
                    >
                        Try Again
                    </button>
                </div>
            )}

        </div>
    );
};

export default PracticePlayer;
