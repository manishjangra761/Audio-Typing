import React, { useState ,useEffect } from "react";
import axios from "../../../services/api";

const UploadAudioPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    language: "",
    duration: "",
    correct_text: "",
  });

  const [audioFile, setAudioFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/category/get_all_categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCategories();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("file", audioFile);

    try {
      await axios.post("/admin/add_new_audio", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    alert("Audio Uploaded Successfully");

    setFormData({
      title: "",
      category_id: "",
      language: "",
      duration: "",
      correct_text: "",
    });

    setAudioFile(null);
    setPreview(null);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="flex justify-center items-start pt-10 pb-20">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white mb-6">
          Upload Audio
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Audio Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />

          {/* Category */}
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
            >
             <option value=""  className="bg-slate-800 text-white">Select Category</option>
           { categories.map((category) => (
              <option key={category.id} value={category.id} className="bg-slate-800 text-white">
                {category.name}
              </option>
            ))}
          </select>

          {/* Language */}
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full bg-white/20 text-white border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          >
            <option value=""  className="bg-slate-800 text-white">Select Language</option>
            <option value="english"  className="bg-slate-800 text-white">English</option>
            <option value="hindi"  className="bg-slate-800 text-white">Hindi</option>
          </select>

          {/* Duration */}
          <input
            type="number"
            name="duration"
            placeholder="Duration (seconds)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Correct Text */}
          <textarea
            name="correct_text"
            placeholder="Correct Text"
            value={formData.correct_text}
            onChange={handleChange}
            rows="4"
            className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/20 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Audio Upload */}
          <div className="text-white">
            <label className="block mb-2">Upload Audio</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="w-full text-sm text-gray-200"
              required
            />
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p className="text-gray-300 mb-2">Preview</p>
              <audio controls src={preview} className="w-full" />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all"
          >
            Upload Audio
          </button>

        </form>
      </div>
    </div>
  );
};

export default UploadAudioPage;
