import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ContactMessages.css"; 

const API_BASE = import.meta.env.VITE_API_URL;

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      console.log("📨 Fetching messages with token:", token ? "✅ Present" : "❌ Missing");
      const res = await axios.get(`${API_BASE}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("✅ Messages fetched:", res.data);
      setMessages(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch messages:", err.response?.status, err.response?.data);
      toast.error(err.response?.data?.message || "Failed to load messages. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages(messages.filter(msg => msg._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <div className="loader">Loading Inbox...</div>;

  return (
    <div className="messages-container">
      <header className="messages-header" id="contact-messages">
        <h1>Contact Enquiries</h1>
        <p>Total Messages: {messages.length}</p>
      </header>

      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className="message-item">
              <div className="msg-top">
                <span className="msg-sender">{msg.name}</span>
                <span className="msg-date">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="msg-email">{msg.email}</div>
              {msg.environment && <div className="msg-subject">Environment: {msg.environment}</div>}
              <div className="msg-body">
                <p>{msg.message}</p>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => deleteMessage(msg._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">No messages available.</div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;