import React, { useEffect, useState } from "react";
import axios from "../../../services/api";

const ManageAudio = () => {
  const [audios, setAudios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [expandedRows, setExpandedRows] = useState({});


  // FETCH AUDIOS
  const fetchAudios = async () => {
    try {
      const res = await axios.get("/admin/audio/get_audios");
      setAudios(res.data.audios);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/get_all_categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchAudios();
      await fetchCategories();
      setLoading(false);
    };

    loadData();
  }, []);

  // START EDIT
  const handleEdit = (audio) => {
    setEditingId(audio.id);

    setEditData({
      title: audio.title,
      correct_text: audio.correct_text,
      category_id: audio.category_id,
      language: audio.language,
    });
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // SAVE EDIT
  const handleSave = async (id) => {
    try {
      await axios.put(`/audio/update_audio/${id}`, editData);

      setEditingId(null);
      setEditData({});
      fetchAudios();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // DELETE AUDIO
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this audio?")) return;

    try {
      await axios.delete(`/audio/delete_audio/${id}`);
      fetchAudios();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const toggleText = (id) => {
  setExpandedRows((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
};


  return (
    <div className="flex justify-center pt-10 pb-20">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-6">
          Manage Audio
        </h2>

        {loading ? (
          <p className="text-gray-300">Loading audios...</p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left text-white">
              <thead>
                <tr className="border-b border-white/20 text-gray-300">
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Language</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Play</th>
                  <th className="p-3">Correct Text</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {audios.map((audio) => (
                  <tr
                    key={audio.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    {/* TITLE */}
                    <td className="p-3">
                      {editingId === audio.id ? (
                        <input
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className="bg-white/20 px-2 py-1 rounded text-white w-full"
                        />
                      ) : (
                        audio.title
                      )}
                    </td>

                    {/* CATEGORY DROPDOWN */}
                    <td className="p-3">
                      {editingId === audio.id ? (
                        <select
                          value={editData.category_id}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category_id: e.target.value,
                            })
                          }
                          className="bg-white/20 px-2 py-1 rounded text-white"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        audio.Category?.name
                      )}
                    </td>

                    {/* LANGUAGE DROPDOWN */}
                    <td className="p-3">
                      {editingId === audio.id ? (
                        <select
                          value={editData.language}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              language: e.target.value,
                            })
                          }
                          className="bg-white/20 px-2 py-1 rounded text-white"
                        >
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                        </select>
                      ) : (
                        audio.language
                      )}
                    </td>

                    {/* DURATION */}
                    <td className="p-3">{audio.duration}s</td>

                    {/* AUDIO PLAYER */}
                    <td className="p-3">
                      <audio controls className="w-48">
                        <source
                          src={`${process.env.REACT_APP_BACKEND_SERVER_URL}/${audio.audio_path}`}
                          type="audio/mpeg"
                        />
                      </audio>
                    </td>

                   
                    {/* CORRECT TEXT */}
                    <td className="p-3 w-72">
                      {editingId === audio.id ? (
                        <textarea
                          value={editData.correct_text}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              correct_text: e.target.value,
                            })
                          }
                          rows={3}
                          className="bg-white/20 px-2 py-1 rounded text-white w-full resize-none overflow-y-auto"
                        />
                      ) : (
                        <textarea
                          value={audio.correct_text || ""}
                          readOnly
                          rows={3}
                          className="bg-white/10 px-2 py-1 rounded text-gray-200 w-full resize-none overflow-y-auto cursor-default"
                        />
                      )}
                    </td>



                    {/* ACTIONS */}
                    <td className="p-3 flex gap-2">

                      {editingId === audio.id ? (
                        <>
                          <button
                            onClick={() => handleSave(audio.id)}
                            className="bg-green-500 px-3 py-1 rounded text-white text-sm hover:bg-green-600"
                          >
                            ✔
                          </button>

                          <button
                            onClick={handleCancel}
                            className="bg-gray-500 px-3 py-1 rounded text-white text-sm hover:bg-gray-600"
                          >
                            ✖
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(audio)}
                            className="bg-cyan-500 px-3 py-1 rounded text-white text-sm hover:bg-cyan-600"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(audio.id)}
                            className="bg-red-500 px-3 py-1 rounded text-white text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAudio;
