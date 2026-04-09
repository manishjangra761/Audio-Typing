import React, { useState, useEffect } from "react";
import axios from "../../../services/api";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaFileAudio, FaTag, FaLanguage, FaClock, FaFileAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        setErrors(prev => ({
          ...prev,
          audioFile: "Please select a valid audio file",
        }));
        return;
      }

      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          audioFile: "File size must be less than 50MB",
        }));
        return;
      }

      setAudioFile(file);
      setPreview(URL.createObjectURL(file));
      setErrors(prev => ({
        ...prev,
        audioFile: "",
      }));
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category_id) newErrors.category_id = "Please select a category";
    if (!formData.language) newErrors.language = "Please select a language";
    if (!formData.correct_text.trim()) newErrors.correct_text = "Correct text is required";
    if (!audioFile) newErrors.audioFile = "Please select an audio file";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsUploading(true);
    setUploadProgress(0);

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
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      // Success
      setFormData({
        title: "",
        category_id: "",
        language: "",
        duration: "",
        correct_text: "",
      });
      setAudioFile(null);
      setPreview(null);
      setUploadProgress(0);

      // Show success message (you might want to use a toast library)
      toast("Audio Uploaded Successfully");

    } catch (err) {
      console.error(err);
      toast("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-6">
          <FaCloudUploadAlt className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Upload Audio Content</h1>
            <p className="text-neutral-300 mt-1">
              Add new audio files for typing practice sessions
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FaFileAudio className="w-5 h-5 text-primary-400" />
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <FaTag className="w-4 h-4" />
                Audio Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter audio title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full bg-white/10 text-white placeholder-neutral-400 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all ${
                  errors.title ? "border-red-400" : "border-white/20"
                }`}
                required
              />
              {errors.title && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <FaExclamationTriangle className="w-3 h-3" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <FaTag className="w-4 h-4" />
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`w-full bg-slate-800 text-white border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all ${
                  errors.category_id ? "border-red-400" : "border-white/20"
                }`}
                required
              >
                <option value="" className="bg-slate-800 text-white">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-slate-800 text-white">
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <FaExclamationTriangle className="w-3 h-3" />
                  {errors.category_id}
                </p>
              )}
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <FaLanguage className="w-4 h-4" />
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={`w-full bg-slate-800 text-white border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all ${
                  errors.language ? "border-red-400" : "border-white/20"
                }`}
                required
              >
                <option value="" className="bg-slate-800 text-white">Select Language</option>
                <option value="english" className="bg-slate-800 text-white">English</option>
                <option value="hindi" className="bg-slate-800 text-white">Hindi</option>
              </select>
              {errors.language && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <FaExclamationTriangle className="w-3 h-3" />
                  {errors.language}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <FaClock className="w-4 h-4" />
                Duration (seconds)
              </label>
              <input
                type="number"
                name="duration"
                placeholder="Enter duration in seconds"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-white/10 text-white placeholder-neutral-400 border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FaFileAlt className="w-5 h-5 text-primary-400" />
            Content Details
          </h2>

          {/* Correct Text */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
              <FaFileAlt className="w-4 h-4" />
              Correct Text *
            </label>
            <textarea
              name="correct_text"
              placeholder="Enter the correct text that should be typed during this audio"
              value={formData.correct_text}
              onChange={handleChange}
              rows="6"
              className={`w-full bg-white/10 text-white placeholder-neutral-400 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all resize-none ${
                errors.correct_text ? "border-red-400" : "border-white/20"
              }`}
              required
            />
            {errors.correct_text && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <FaExclamationTriangle className="w-3 h-3" />
                {errors.correct_text}
              </p>
            )}
          </div>
        </div>

        {/* File Upload Section */}
        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FaCloudUploadAlt className="w-5 h-5 text-primary-400" />
            Audio File Upload
          </h2>

          {/* File Input */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
              <FaCloudUploadAlt className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="hidden"
                id="audio-upload"
                required
              />
              <label
                htmlFor="audio-upload"
                className="cursor-pointer text-white hover:text-primary-300 transition-colors"
              >
                <span className="font-semibold">Click to upload</span> or drag and drop
                <br />
                <span className="text-sm text-neutral-400">MP3, WAV, OGG up to 50MB</span>
              </label>
            </div>

            {errors.audioFile && (
              <p className="text-red-400 text-sm flex items-center gap-1 justify-center">
                <FaExclamationTriangle className="w-3 h-3" />
                {errors.audioFile}
              </p>
            )}

            {/* File Info */}
            {audioFile && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">{audioFile.name}</p>
                    <p className="text-neutral-400 text-sm">
                      {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Audio Preview */}
          {preview && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Audio Preview</h3>
              <div className="bg-neutral-900/50 rounded-xl p-4">
                <audio controls src={preview} className="w-full" />
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Uploading...</span>
                <span className="text-primary-400">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-primary-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isUploading}
            className="btn btn-primary px-12 py-4 rounded-xl text-lg font-semibold hover:scale-105 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FaCloudUploadAlt className="w-5 h-5" />
                Upload Audio
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadAudioPage;
