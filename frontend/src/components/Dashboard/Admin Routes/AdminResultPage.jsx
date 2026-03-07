import React, { useEffect, useState } from "react";
import axios from "../../../services/api";
import { useNavigate } from "react-router-dom";

const AdminResultPage = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [allAudios , setAllAudios] = useState([]);
  const [users, setUsers] = useState([]);
  const [audios, setAudios] = useState([]);
  const navigate = useNavigate();

  // GET ALL USERS
  const getAllUsers = async () => {
    try {
      const response = await axios.get("/user/get_all_users");
      setUsers(response.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  // GET UNIQUE AUDIOS
  const getUniqueAudios = async () => {
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

  // GET ATTEMPTS
  const getAudioAttempts = async () => {
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

  // LOAD USERS
  useEffect(() => {
    getAllUsers();
  }, []);

  // LOAD USER AUDIOS
  useEffect(() => {
    if (selectedUser) {
      setSelectedAudio(null);
      getUniqueAudios();
    }
  }, [selectedUser]);

  // LOAD ATTEMPTS
  useEffect(() => {
    if (selectedAudio) {
      getAudioAttempts();
    }
  }, [selectedAudio]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Result Page</h2>

      {/* STEP 1 USERS */}
      {!selectedUser && (
        <div>
          <h3>Users</h3>

          {users.map((user) => (
            <div
              key={user.id}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}

      {/* STEP 2 AUDIOS */}
      {selectedUser && !selectedAudio && (
        <div>
          <button onClick={() => setSelectedUser(null)}>⬅ Back</button>

          <h3>{selectedUser.name} - Audio Results</h3>

          {audios.map((audio) => (
            <div
              key={audio.audio_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <div>
                <p>{audio.title}</p>
                <p>Correct Words: {audio.correct_words}</p>
                <p>Accuracy: {audio.accuracy}%</p>
              </div>

              <button onClick={() => setSelectedAudio(audio)}>
                ➡ View Attempts
              </button>
            </div>
          ))}
        </div>
      )}

      {/* STEP 3 ATTEMPTS */}
      {selectedAudio && (
        <div>
          <button onClick={() => setSelectedAudio(null)}>⬅ Back</button>

          <h3>{selectedAudio.title} - All Attempts</h3>

          {allAudios.map((attempt) => (
            <div
              key={attempt.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>Date: {attempt.createdAt}</p>
              <p>Correct Words: {attempt.correct_words}</p>
              <p>Accuracy: {attempt.accuracy}%</p>
               <button
                onClick={() =>
                    navigate(`/admin/results/${attempt.id}`,{ state: attempt })
                }
                className="btn btn-primary px-4 py-2 rounded-lg"
            >
                Show
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminResultPage;
