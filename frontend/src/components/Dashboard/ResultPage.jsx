// // import React, { useEffect, useState } from 'react'
// // import DashboardLayout from './DashboardLayout'
// // import axios from '../../services/api'

// // const ResultPage = () => {

// //     const [results, setResults] = useState([])
// //     const [selectedResult, setSelectedResult] = useState(null)

// //     // fetch results
// //     const getResults = async () => {

// //         try {

// //             const res = await axios.get("/student/get_result")
// //             setResults(res.data.attempts || [])

// //         } catch (err) {

// //             console.error("Failed to load results", err)

// //         }

// //     }

// //     useEffect(() => {

// //         getResults()

// //     }, [])

// //     return (

// //         <DashboardLayout role="student" userName="Manish">

// //             <div className="space-y-8">

// //                 {!selectedResult && (<div><h1 className="text-3xl font-bold text-white">
// //                     My Practice Results
// //                 </h1>


// //                     <div className="glass-card rounded-2xl overflow-hidden">

// //                         <table className="w-full text-left">

// //                             <thead className="bg-white/10 text-white">

// //                                 <tr>
// //                                     <th className="px-6 py-4">Audio</th>
// //                                     <th className="px-6 py-4">Accuracy</th>
// //                                     <th className="px-6 py-4">Score</th>
// //                                     <th className="px-6 py-4">Date</th>
// //                                     <th className="px-6 py-4">Action</th>
// //                                 </tr>

// //                             </thead>

// //                             <tbody>

// //                                 {results.map((result, index) => (

// //                                     <tr
// //                                         key={result.id}
// //                                         className={`${index % 2 === 0 ? "bg-white/5" : "bg-white/10"} hover:bg-white/20 transition`}
// //                                     >

// //                                         <td className="px-6 py-4 text-white">
// //                                             {result["Audio.title"]}
// //                                         </td>

// //                                         <td className="px-6 py-4 text-neutral-300">
// //                                             {result.accuracy}%
// //                                         </td>

// //                                         <td className="px-6 py-4 text-neutral-300">
// //                                             {result.score}
// //                                         </td>

// //                                         <td className="px-6 py-4 text-neutral-300">
// //                                             {new Date(result.createdAt).toLocaleString()}
// //                                         </td>

// //                                         <td className="px-6 py-4">

// //                                             <button
// //                                                 onClick={() => setSelectedResult(result)}
// //                                                 className="btn btn-primary px-4 py-2 rounded-lg"
// //                                             >
// //                                                 Show
// //                                             </button>

// //                                         </td>

// //                                     </tr>

// //                                 ))}

// //                             </tbody>

// //                         </table>

// //                     </div>
// //                 </div>)}


// //                 {/* RESULT DETAILS MODAL */}

// //                 {selectedResult && (

// //                     <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

// //                         <div className="glass-card p-8 rounded-2xl w-[500px] space-y-6">

// //                             <h2 className="text-2xl font-bold text-white">
// //                                 Result Details
// //                             </h2>

// //                             <div className="space-y-2 text-white">

// //                                 <p>
// //                                     <strong>Audio:</strong> {selectedResult["Audio.title"]}
// //                                 </p>

// //                                 <p>
// //                                     <strong>Accuracy:</strong> {selectedResult.accuracy}%
// //                                 </p>

// //                                 <p>
// //                                     <strong>Score:</strong> {selectedResult.score}
// //                                 </p>

// //                                 <p>
// //                                     <strong>Correct Words:</strong> {selectedResult.correct_words}
// //                                 </p>

// //                                 <p>
// //                                     <strong>Wrong Words:</strong> {selectedResult.wrong_words}
// //                                 </p>

// //                                 <p>
// //                                     <strong>Typed Text:</strong> {selectedResult.typed_text}
// //                                 </p>

// //                                 <p>
// //                                     <strong>Attempt Type:</strong> {selectedResult.attempt_type}
// //                                 </p>

// //                             </div>

// //                             <button
// //                                 onClick={() => setSelectedResult(null)}
// //                                 className="btn btn-secondary px-6 py-2 rounded-lg"
// //                             >
// //                                 Close
// //                             </button>

// //                         </div>

// //                     </div>

// //                 )}

// //             </div>

// //         </DashboardLayout>

// //     )
// // }

// // export default ResultPage





// import React, { useEffect, useState } from 'react'
// import DashboardLayout from './DashboardLayout'
// import axios from '../../services/api'
// import { useNavigate } from 'react-router-dom'

// const ResultPage = () => {

//     const [results, setResults] = useState([])
//     const navigate = useNavigate()

//     const getResults = async () => {
//         try {
//             const res = await axios.get("/student/get_result")
//             setResults(res.data.attempts || [])
//         } catch (err) {
//             console.error("Failed to load results", err)
//         }
//     }

//     useEffect(() => {
//         getResults()
//     }, [])

//     return (

//         <DashboardLayout role="student" userName="Manish">

//             <div className="space-y-8">

//                 <h1 className="text-3xl font-bold text-white">
//                     My Practice Results
//                 </h1>

//                 <div className="glass-card rounded-2xl overflow-hidden">

//                     <table className="w-full text-left">

//                         <thead className="bg-white/10 text-white">
//                             <tr>
//                                 <th className="px-6 py-4">Audio</th>
//                                 <th className="px-6 py-4">Accuracy</th>
//                                 <th className="px-6 py-4">Score</th>
//                                 <th className="px-6 py-4">Date</th>
//                                 <th className="px-6 py-4">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>

//                             {results.map((result, index) => (

//                                 <tr
//                                     key={result.id}
//                                     className={`${index % 2 === 0 ? "bg-white/5" : "bg-white/10"} hover:bg-white/20`}
//                                 >

//                                     <td className="px-6 py-4 text-white">
//                                         {result["Audio.title"]}
//                                     </td>

//                                     <td className="px-6 py-4 text-neutral-300">
//                                         {result.accuracy}%
//                                     </td>

//                                     <td className="px-6 py-4 text-neutral-300">
//                                         {result.score}
//                                     </td>

//                                     <td className="px-6 py-4 text-neutral-300">
//                                         {new Date(result.createdAt).toLocaleString()}
//                                     </td>

//                                     <td className="px-6 py-4">

//                                         <button
//                                             onClick={() => navigate(`/result/${result.id}`)}
//                                             className="btn btn-primary px-4 py-2 rounded-lg"
//                                         >
//                                             Show
//                                         </button>

//                                     </td>

//                                 </tr>

//                             ))}

//                         </tbody>

//                     </table>

//                 </div>

//             </div>

//         </DashboardLayout>
//     )
// }

// export default ResultPage


import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {

    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    const getResults = async () => {

        try {

            const res = await axios.get("/student/get_result?unique=true");
            setResults(res.data.attempts || []);

        } catch (err) {

            console.error("Failed to load results", err);

        }

    };

    useEffect(() => {

        getResults();

    }, []);

    return (

        <DashboardLayout role="student" userName="Manish">

            <div className="space-y-8">

                <h1 className="text-3xl font-bold text-white">
                    My Practice Results
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
                                                navigate(`/dashboard/results/${result.id}`, {
                                                    state: result
                                                })
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

        </DashboardLayout>

    );

};

export default ResultPage;
