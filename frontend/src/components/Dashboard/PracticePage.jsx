import React, { useState, useEffect, useCallback } from "react";
import { FaHeadphones } from 'react-icons/fa';
import api from "../../services/api";

// const PracticePage = () => {
//   const [step, setStep] = useState(1);

//   const [categories, setCategories] = useState([]);
//   const [audios, setAudios] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const [search, setSearch] = useState("");

//   const navigate = useNavigate();

//   // -----------------------------
//   // Fetch Categories
//   // -----------------------------
//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const res = await api.get("/category/get_all_categories");
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         console.error("Failed to load categories", err);
//       }
//     };

//     getCategories();
//   }, []);

//   // -----------------------------
//   // Fetch Audios (Backend Filter)
//   // -----------------------------
//   const getAudios = async () => {
//     try {
//       const res = await api.get("/audio/get_audios", {
//         params: {
//           category: selectedCategory,
//           language: selectedLanguage,
//           search: search,
//         },
//       });
//       setAudios(res.data.audios || []);
//     } catch (err) {
//       console.error("Error fetching audios", err);
//     }
//   };

//   // -----------------------------
//   // Debounce Search + Fetch
//   // -----------------------------
//   useEffect(() => {
//     if (step === 3 && selectedCategory && selectedLanguage) {
//       const delay = setTimeout(() => {
//         getAudios();
//       }, 500);
//       return () => clearTimeout(delay);
//     }
//   }, [search, selectedCategory, selectedLanguage]);

//   const formatDuration = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}m ${remainingSeconds}s`;
//   };

//   return (
//     <DashboardLayout role="student" userName="Manish">
//       <div className="space-y-12">
//         {/* STEP 1 — CATEGORY */}
//         {step === 1 && (
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold text-white">Practice Tests</h1>
//               <p className="text-neutral-300">
//                 Choose a category you want to practice
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {categories.map((cat) => (
//                 <div
//                   key={cat.id}
//                   onClick={() => {
//                     setSelectedCategory(cat.id);
//                     setStep(2);
//                   }}
//                   className="glass-card p-6 rounded-2xl cursor-pointer hover:glass-light smooth-transition"
//                 >
//                   <h3 className="text-xl font-semibold text-white">
//                     {cat.name}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* STEP 2 — LANGUAGE */}
//         {step === 2 && (
//           <div className="space-y-6">
//             <button
//               onClick={() => setStep(1)}
//               className="text-sm text-neutral-300 hover:text-white"
//             >
//               ← Back
//             </button>
//             <h2 className="text-2xl font-semibold text-white">
//               Choose Language
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {["english", "hindi"].map((lang) => (
//                 <div
//                   key={lang}
//                   onClick={() => {
//                     setSelectedLanguage(lang);
//                     setStep(3);
//                   }}
//                   className="glass-card p-6 rounded-2xl cursor-pointer hover:glass-light smooth-transition text-center capitalize"
//                 >
//                   {lang}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* STEP 3 — AUDIO LIST */}
//         {step === 3 && (
//           <div className="space-y-6">
//             <button
//               onClick={() => setStep(2)}
//               className="text-sm text-neutral-300 hover:text-white"
//             >
//               ← Back
//             </button>
//             <h2 className="text-2xl font-semibold text-white">
//               Available Audios
//             </h2>

//             <div className="glass-card p-6 rounded-3xl">
//               <input
//                 type="text"
//                 placeholder="Search audio..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-transparent border border-white/30 rounded-full px-6 py-3 text-white placeholder-neutral-500 focus:outline-none"
//               />
//             </div>

//             {audios.length === 0 ? (
//               <p className="text-neutral-400">No audios found</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full table-auto text-left">
//                   <thead>
//                     <tr className="bg-white/10 text-white">
//                       <th className="px-6 py-3">Title</th>
//                       <th className="px-6 py-3">Category</th>
//                       <th className="px-6 py-3">Language</th>
//                       <th className="px-6 py-3">Duration</th>
//                       <th className="px-6 py-3">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {audios.map((audio, idx) => (
//                       <tr
//                         key={audio.id}
//                         className={`${idx % 2 === 0 ? "bg-white/5": "bg-white/10"} hover:bg-white/20 smooth-transition`}
//                         style={{ animationDelay: `${0.05 * idx}s` }}
//                       >
//                         <td className="px-6 py-4 flex items-center gap-2 text-white">
//                           <FaHeadphones className="w-5 h-5" /> {audio.title}
//                         </td>
//                         <td className="px-6 py-4 text-neutral-400 text-sm">
//                           {audio.Category?.name}
//                         </td>
//                         <td className="px-6 py-4 text-neutral-400 text-sm capitalize">
//                           {audio.language}
//                         </td>
//                         <td className="px-6 py-4 text-neutral-400 text-sm">
//                           {formatDuration(audio.duration)}
//                         </td>
//                         <td className="px-6 py-4 text-left">
//                           <button  onClick={() => navigate(`/dashboard/practice/${audio.id}`)}
//                            className="btn btn-primary px-4 py-2 rounded-lg">
//                             ▶ Start
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default PracticePage;






import { useSearchParams, useNavigate } from "react-router-dom";

const PracticePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const language = searchParams.get("language");

  const [categories, setCategories] = useState([]);
  const [audios, setAudios] = useState([]);
  const [search, setSearch] = useState("");

  const [loadingCategories, setLoadingCategories] = useState(true);

   const navigate = useNavigate();

  // -----------------------------------
  // Update URL Params
  // -----------------------------------
  const updateParams = (newParams) => {

    const params = Object.fromEntries([...searchParams]);

    setSearchParams({
      ...params,
      ...newParams
    });

  };


  // -----------------------------------
  // Fetch Categories
  // -----------------------------------
  useEffect(() => {

    const getCategories = async () => {

      try {

        const res = await axios.get("/category/get_all_categories");

        setCategories(res.data.categories || []);

      } catch (err) {

        console.error("Failed to load categories", err);

      } finally {

        setLoadingCategories(false);

      }

    };

    getCategories();

  }, []);



  // -----------------------------------
  // Fetch Audios
  // -----------------------------------
  useEffect(() => {

    if (category && language) {

      fetchAudios();

    }

  }, [category, language, search]);



  const fetchAudios = useCallback(async () => {

    try {

      const res = await axios.get("/audio/get_audios", {
        params: {
          category,
          language,
          search
        }
      });

      setAudios(res.data.audios || []);

    } catch (err) {

      console.error("Failed to fetch audios", err);

    }

  }, [category, language, search]);


  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };


  return (
    <div>

      {/* ------------------ */}
      {/* STEP 1 CATEGORY */}
      {/* ------------------ */}

      {!category && (

        <div className="space-y-6">

          <h1 className="text-3xl font-bold text-white">
            Practice Tests
          </h1>

          <p className="text-neutral-400">
            Choose a category you want to practice
          </p>

          {loadingCategories ? (

            <p className="text-white">Loading categories...</p>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {categories.map((cat) => (

                <button
                  key={cat.id}
                  onClick={() => updateParams({ category: cat.id })}
                  className="glass-card p-6 rounded-xl text-white hover:bg-white/10 transition"
                >

                  {cat.name}

                </button>

              ))}

            </div>

          )}

        </div>

      )}



      {/* ------------------ */}
      {/* STEP 2 LANGUAGE */}
      {/* ------------------ */}

      {category && !language && (

        <div className="space-y-6">

          <h1 className="text-3xl font-bold text-white">
            Choose Language
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <button
              onClick={() => updateParams({ language: "english" })}
              className="glass-card p-6 rounded-xl text-white hover:bg-white/10 transition"
            >
              English
            </button>

            <button
              onClick={() => updateParams({ language: "hindi" })}
              className="glass-card p-6 rounded-xl text-white hover:bg-white/10 transition"
            >
              Hindi
            </button>

          </div>

        </div>

      )}



      {/* ------------------ */}
      {/* STEP 3 AUDIO LIST */}
      {/* ------------------ */}

      {category && language && (

        <div className="space-y-6">

          <h1 className="text-3xl font-bold text-white">
            Practice Audios
          </h1>


          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search audio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 text-white"
          />


          {/* AUDIO LIST */}

          <div className="space-y-4">

           {audios.length === 0 ? (
              <p className="text-neutral-400">No audios found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-left">
                  <thead>
                    <tr className="bg-white/10 text-white">
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Language</th>
                      <th className="px-6 py-3">Duration</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audios.map((audio, idx) => (
                      <tr
                        key={audio.id}
                        className={`${idx % 2 === 0 ? "bg-white/5": "bg-white/10"} hover:bg-white/20 smooth-transition`}
                        style={{ animationDelay: `${0.05 * idx}s` }}
                      >
                        <td className="px-6 py-4 flex items-center gap-2 text-white">
                          <FaHeadphones className="w-5 h-5" /> {audio.title}
                        </td>
                        <td className="px-6 py-4 text-neutral-400 text-sm">
                          {audio.Category?.name}
                        </td>
                        <td className="px-6 py-4 text-neutral-400 text-sm capitalize">
                          {audio.language}
                        </td>
                        <td className="px-6 py-4 text-neutral-400 text-sm">
                          {formatDuration(audio.duration)}
                        </td>
                        <td className="px-6 py-4 text-left">
                          <button  onClick={() => navigate(`/dashboard/practice/${audio.id}`)}
                           className="btn btn-primary px-4 py-2 rounded-lg">
                            ▶ Start Practice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        {/* )}

          </div> */}

        </div>

      )}

    </div>
  );

};

export default PracticePage;
