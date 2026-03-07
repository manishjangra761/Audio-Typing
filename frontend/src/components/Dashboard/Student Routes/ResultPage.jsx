import React, { useEffect, useState, useCallback } from "react";
import axios from "../../../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const ResultPage = () => {

    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();   // get current URL
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

    }, [location.pathname, getResults]);   // reload when url changes

    return (

            <div className="space-y-8">

                <h1 className="text-3xl font-bold text-white">
                    {isHistoryPage ? "Performance History" : "My Practice Results"}
                </h1>

                <div className="glass-card rounded-2xl overflow-hidden">

                    <table className="w-full text-left">

                        <thead className="bg-white/10 text-white">
                            <tr>
                                <th className="px-6 py-4">Audio</th>
                                <th className="px-6 py-4">Accuracy</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {results.map((result, index) => (

                                <tr
                                    key={result.id}
                                    className={`${index % 2 === 0 ? "bg-white/5" : "bg-white/10"} hover:bg-white/20 transition`}
                                >

                                    <td className="px-6 py-4 text-white">
                                        {result["Audio.title"]}
                                    </td>

                                    <td className="px-6 py-4 text-neutral-300">
                                        {result.accuracy}%
                                    </td>

                                    <td className="px-6 py-4 text-neutral-300">
                                        {result.score}
                                    </td>

                                    <td className="px-6 py-4 text-neutral-300">
                                        {new Date(result.createdAt).toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    isHistoryPage
                                                        ? `/dashboard/history/${result.id}`
                                                        : `/dashboard/results/${result.id}`,
                                                    { state: result }
                                                )
                                            }
                                            className="btn btn-primary px-4 py-2 rounded-lg"
                                        >
                                            Show
                                        </button>


                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

    );

};

export default ResultPage;
