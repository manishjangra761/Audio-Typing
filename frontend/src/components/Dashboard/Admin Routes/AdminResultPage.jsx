import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaUser, FaList } from "react-icons/fa";

const AdminResultPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [allAudios, setAllAudios] = useState([]);
  const [users, setUsers] = useState([]);
  const [audios, setAudios] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axios.get("/user/get_all_users");
      setUsers(response.data.users || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  // LOAD USER AUDIOS
  useEffect(() => {
    if (!selectedUser) return;
    setSelectedAudio(null);
    const load = async () => {
      try {
        const response = await axios.get("/student/get_result", {
          params: {
            unique: true,
            user_id: selectedUser.id,
          },
        });
        setAudios(response.data.attempts || []);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, [selectedUser]);

  // LOAD ATTEMPTS
  useEffect(() => {
    if (!selectedAudio || !selectedUser) return;
    const load = async () => {
      try {
        const response = await axios.get("/student/get_result", {
          params: {
            user_id: selectedUser.id,
            audio_id: selectedAudio.audio_id,
          },
        });
        setAllAudios(response.data.attempts || []);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, [selectedAudio, selectedUser]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center gap-4 mb-6">
          <FaList className="w-8 h-8 text-primary-400" />
          <h1 className="text-3xl font-bold text-white">Admin Results Management</h1>
        </div>
        <p className="text-neutral-300">
          View and manage user practice results and performance analytics
        </p>
      </div>

      {/* STEP 1: USERS SELECTION */}
      {!selectedUser && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FaUser className="w-6 h-6 text-primary-400" />
            <h2 className="text-2xl font-bold text-white">Select a User</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="glass-card p-6 rounded-2xl hover:glass-light smooth-transition cursor-pointer group"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-300">
                      {user.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: AUDIO RESULTS */}
      {selectedUser && !selectedAudio && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn-secondary px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Users
              </button>
              
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {audios.map((audio) => (
              <div
                key={audio.audio_id}
                className="glass-card p-6 rounded-2xl space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {audio.title}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">Correct Words:</span>
                        <span className="text-green-400 font-semibold">
                          {audio.correct_words}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">Accuracy:</span>
                        <span className="text-blue-400 font-semibold">
                          {audio.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAudio(audio)}
                    className="btn btn-primary px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 smooth-transition"
                  >
                    <FaEye className="w-4 h-4" />
                    View Attempts
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: ATTEMPT DETAILS */}
      {selectedAudio && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedAudio(null)}
                className="btn-secondary px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Audios
              </button>
              <div className="flex items-center gap-3">
               
               
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {allAudios.map((attempt) => (
              <div
                key={attempt.id}
                className="glass-card p-6 rounded-2xl hover:glass-light smooth-transition"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="text-neutral-400">
                        Date: {new Date(attempt.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-neutral-400">
                        Time: {new Date(attempt.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">Correct Words:</span>
                        <span className="text-green-400 font-semibold">
                          {attempt.correct_words}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">Accuracy:</span>
                        <span className="text-blue-400 font-semibold">
                          {attempt.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/admin/results/${attempt.id}`, { state: attempt })
                    }
                    className="btn btn-primary px-6 py-3 rounded-lg flex items-center gap-2 hover:scale-105 smooth-transition"
                  >
                    <FaEye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResultPage;
