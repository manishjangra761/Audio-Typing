import React, { useEffect, useState } from "react";
import axios from "../../../services/api";
import {
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaFilter,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

const ContactMessages = () => {

  const [messages, setMessages] = useState([]);
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (selectedType = "all", selectedStatus = "") => {

    try {

      setLoading(true);

      const res = await axios.get("/superadmin/get_all_messages", {
        params: {
          type: selectedType,
          status: selectedStatus
        }
      });

      setMessages(res.data.messages || []);

    } catch (err) {

      console.error("Error fetching messages", err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchMessages(type, status);
  }, [type, status]);

  const markAsRead = async (id) => {

    try {

      await axios.put(`/superadmin/update_message/${id}`);
      fetchMessages(type, status);

    } catch (err) {

      console.error("Error updating message", err);

    }

  };

  if (loading) {

    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="glass-card p-12 rounded-3xl text-center">
          <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Loading Messages
          </h2>
          <p className="text-neutral-400">Fetching contact messages...</p>
        </div>
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="glass-card p-8 rounded-3xl">

        <div className="flex items-center gap-4 mb-6">
          <FaCommentDots className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">
              Contact & Feedback Messages
            </h1>
            <p className="text-neutral-300 mt-1">
              Manage all user contact and feedback submissions
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Type Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-slate-800 text-white border border-white/20 rounded-lg pl-10 pr-4 py-3"
            >
              <option value="all" className="bg-slate-800">All Messages</option>
              <option value="contact" className="bg-slate-800">Contact</option>
              <option value="feedback" className="bg-slate-800">Feedback</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-800 text-white border border-white/20 rounded-lg pl-10 pr-4 py-3"
            >
              <option value="" className="bg-slate-800">All Status</option>
              <option value="read" className="bg-slate-800">Read</option>
              <option value="unread" className="bg-slate-800">Unread</option>
            </select>

          </div>

        </div>

      </div>

      {/* Table */}
      <div className="glass-card rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Message</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">

              {messages.length === 0 ? (

                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">

                    <div className="flex flex-col items-center gap-4">
                      <FaExclamationTriangle className="w-12 h-12 text-neutral-400" />

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          No Messages Found
                        </h3>
                        <p className="text-neutral-400 text-sm">
                          No contact or feedback messages available
                        </p>
                      </div>
                    </div>

                  </td>
                </tr>

              ) : (

                messages.map((msg, index) => (

                  <tr key={msg.id} className="hover:bg-white/5 transition-colors">

                    <td className="px-6 py-4 text-white font-mono text-sm">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-white">
                      {msg.name}
                    </td>

                    <td className="px-6 py-4">

                      <div className="space-y-1">

                        <div className="flex items-center gap-2 text-neutral-300">
                          <FaEnvelope className="w-3 h-3 text-neutral-400" />
                          <span className="text-sm">{msg.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-neutral-300">
                          <FaPhone className="w-3 h-3 text-neutral-400" />
                          <span className="text-sm">{msg.phone}</span>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${msg.form_type === "feedback"
                          ? "bg-purple-500/10 border border-purple-500/20 text-purple-400"
                          : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                        }`}>
                        {msg.form_type}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-xs text-neutral-300 truncate">
                      {msg.message}
                    </td>

                    <td className="px-6 py-4">

                      {msg.status === "read" ? (

                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400">
                          <FaCheckCircle className="w-3 h-3" />
                          Read
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                          Unread
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-4 text-neutral-400 text-sm">
                      {new Date(msg.created_at).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">

                      {msg.status !== "read" && (

                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="btn btn-primary px-3 py-2 text-sm"
                        >
                          Mark Read
                        </button>

                      )}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default ContactMessages;
