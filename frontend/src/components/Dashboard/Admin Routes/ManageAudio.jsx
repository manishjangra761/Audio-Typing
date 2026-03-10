import React, { useEffect, useState } from "react";
import axios from "../../../services/api";
import {
  FaMusic,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaPlay,
  FaPause,
  FaTag,
  FaLanguage,
  FaClock,
  FaSearch,
  FaFilter,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";
import { toast } from "react-toastify";

const ManageAudio = () => {
  const [audios, setAudios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [playingAudio, setPlayingAudio] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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

  // FILTERED AUDIOS
  const filteredAudios = audios.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audio.correct_text?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || audio.category_id === parseInt(selectedCategory);
    const matchesLanguage = !selectedLanguage || audio.language === selectedLanguage;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

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
      // Show success feedback (you might want to use a toast library)
      toast("Audio updated successfully!");
    } catch (err) {
      console.log(err);
      toast("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  // DELETE AUDIO
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/audio/delete_audio/${id}`);
      fetchAudios();
      setDeleteConfirm(null);
      toast("Audio deleted successfully!");
    } catch (err) {
      console.log(err);
      toast("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const togglePlay = (audioId) => {
    setPlayingAudio(playingAudio === audioId ? null : audioId);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-card p-8 rounded-3xl">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white">Loading audio files...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-6">
          <FaMusic className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Audio Files</h1>
            <p className="text-neutral-300 mt-1">
              View, edit, and manage all uploaded audio content
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-primary-400">{audios.length}</div>
            <div className="text-neutral-300">Total Audios</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">
              {audios.filter(a => a.language === 'english').length}
            </div>
            <div className="text-neutral-300">English</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">
              {audios.filter(a => a.language === 'hindi').length}
            </div>
            <div className="text-neutral-300">Hindi</div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-slate-800 text-white">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <FaLanguage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-white/10 text-white border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            >
              <option value="">All Languages</option>
              <option value="english" className="bg-slate-800 text-white">English</option>
              <option value="hindi" className="bg-slate-800 text-white">Hindi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audio Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAudios.length === 0 ? (
          <div className="col-span-full glass-card p-12 rounded-3xl text-center">
            <FaMusic className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Audio Files Found</h3>
            <p className="text-neutral-400">
              {searchTerm || selectedCategory || selectedLanguage
                ? "Try adjusting your search or filter criteria"
                : "No audio files have been uploaded yet"}
            </p>
          </div>
        ) : (
          filteredAudios.map((audio) => (
            <div key={audio.id} className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {editingId === audio.id ? (
                    <input
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="Audio title"
                    />
                  ) : (
                    <h3 className="text-xl font-semibold text-white mb-1">{audio.title}</h3>
                  )}

                  <div className="flex items-center gap-4 text-sm text-neutral-300">
                    <span className="flex items-center gap-1">
                      <FaTag className="w-3 h-3" />
                      {audio.Category?.name || 'No Category'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaLanguage className="w-3 h-3" />
                      {audio.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {audio.duration}s
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 ml-4">
                  {editingId === audio.id ? (
                    <>
                      <button
                        onClick={() => handleSave(audio.id)}
                        className="btn btn-success p-2 rounded-lg hover:scale-105 smooth-transition"
                        title="Save changes"
                      >
                        <FaSave className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-secondary p-2 rounded-lg hover:scale-105 smooth-transition"
                        title="Cancel editing"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(audio)}
                        className="btn btn-primary p-2 rounded-lg hover:scale-105 smooth-transition"
                        title="Edit audio"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(audio.id)}
                        className="btn btn-danger p-2 rounded-lg hover:scale-105 smooth-transition"
                        title="Delete audio"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Audio Player */}
              <div className="bg-neutral-900/50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => togglePlay(audio.id)}
                    className="btn btn-primary p-2 rounded-lg hover:scale-105 smooth-transition"
                  >
                    {playingAudio === audio.id ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
                  </button>
                  <span className="text-white font-medium">Audio Preview</span>
                </div>
                <audio
                  controls
                  className="w-full"
                  src={`${process.env.REACT_APP_BACKEND_SERVER_URL}/${audio.audio_path}`}
                  onPlay={() => setPlayingAudio(audio.id)}
                  onPause={() => setPlayingAudio(null)}
                  onEnded={() => setPlayingAudio(null)}
                />
              </div>

              {/* Correct Text */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-300">Correct Text:</label>
                {editingId === audio.id ? (
                  <textarea
                    value={editData.correct_text}
                    onChange={(e) => setEditData({ ...editData, correct_text: e.target.value })}
                    rows={2}
                    className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none overflow-y-auto"
                    placeholder="Enter correct text"
                  />
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 max-h-20 overflow-y-auto">
                    <p className="text-neutral-200 text-sm leading-relaxed">
                      {audio.correct_text || "No text available"}
                    </p>
                  </div>
                )}
              </div>

              {/* Edit Mode Category/Language */}
              {editingId === audio.id && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">Category:</label>
                    <select
                      value={editData.category_id}
                      onChange={(e) => setEditData({ ...editData, category_id: e.target.value })}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-slate-800 text-white">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">Language:</label>
                    <select
                      value={editData.language}
                      onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="english" className="bg-slate-800 text-white">English</option>
                      <option value="hindi" className="bg-slate-800 text-white">Hindi</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-8 rounded-3xl max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-white">Confirm Delete</h3>
            </div>
            <p className="text-neutral-300 mb-6">
              Are you sure you want to delete this audio file? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="btn btn-danger flex-1"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAudio;
