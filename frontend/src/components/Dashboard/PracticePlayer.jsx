import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import axios from "../../services/api";
import { toast } from "react-toastify";

const PracticePlayer = () => {
    const { id } = useParams();

    const [audio, setAudio] = useState(null);
    const [typedText, setTypedText] = useState("");

    const getAudio = async () => {
        try {
            const res = await axios.get(`/audio/get_audio/${id}`);
            setAudio(res.data.audio);
        } catch (err) {
            console.error("Failed to load audio", err);
        }
    };

    const addResult = () =>{
        axios.post('/student/add_result' , {
            audio_id : id,
            typed_text : typedText
        }).then((res) => {
            console.log(res);
            toast.success(res.data.message);
            setTypedText('');
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        getAudio();
    }, []);

    if (!audio) return <p className="text-white">Loading...</p>;

    return (
        <DashboardLayout role="student" userName="Manish">
            <div className="space-y-8">

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

            </div>
        </DashboardLayout>
    );
};

export default PracticePlayer;
