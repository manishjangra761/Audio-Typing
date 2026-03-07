import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const result = location.state;

    if (!result) {
        return (
            <div>
                <p className="text-white">Result not found</p>
            </div>
        );
    }

    return (

        <div className="max-w-4xl mx-auto space-y-8">

                <p
                    onClick={() => navigate(-1)}
                    className="text-white cursor-pointer"
                >
                    ← Back
                </p>

                <h1 className="text-3xl font-bold text-white">
                    Result Details
                </h1>

                <div className="glass-card p-8 rounded-2xl space-y-4 text-white">

                    <p>
                        <strong>Audio Title:</strong> {result["Audio.title"]}
                    </p>

                    <p>
                        <strong>Accuracy:</strong> {result.accuracy}%
                    </p>

                    <p>
                        <strong>Score:</strong> {result.score}
                    </p>

                    <p>
                        <strong>Correct Words:</strong> {result.correct_words}
                    </p>

                    <p>
                        <strong>Wrong Words:</strong> {result.wrong_words}
                    </p>

                    <p>
                        <strong>Typed Text:</strong> {result.typed_text}
                    </p>

                    <p>
                        <strong>Attempt Type:</strong> {result.attempt_type}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(result.createdAt).toLocaleString()}
                    </p>

                </div>

            </div>

    );

};

export default ResultDetails;
