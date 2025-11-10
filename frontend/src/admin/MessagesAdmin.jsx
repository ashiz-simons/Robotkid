import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await API.get("/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Error loading messages:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  if (loading) return <p>Loading messages...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-sm text-gray-600">📧 {m.email}</p>
              <p className="mt-2 text-gray-700">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
