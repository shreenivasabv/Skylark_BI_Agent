import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Contact.css";

const API_BASE = import.meta.env.VITE_API_URL;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    environment: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await axios.post(`${API_BASE}/api/contact`, formData);
      
      // Professional meaningful popup
      toast.success(
        `Thank you, ${formData.name}! Your request is received. Our engineers will connect with you shortly.`,
        {
          duration: 6000,
          position: 'top-center',
          style: {
            border: '1px solid #22c55e',
            padding: '16px',
            color: '#166534',
            background: '#f0fdf4',
            fontWeight: '500',
            borderRadius: '12px'
          },
          icon: '✅',
        }
      );

      // Clear the form
      setFormData({ name: "", email: "", environment: "", message: "" });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Transmission failed. Please check your connection.";
      toast.error(errorMsg);
      console.error("Contact submission error:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact an Engineer</h2>
      <p className="contact-sub">No sales pitch. Just solutions.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="environment" 
          placeholder="Current Environment (Nutanix, VMware, etc.)" 
          value={formData.environment}
          onChange={handleChange} 
        />
        <textarea 
          name="message" 
          placeholder="How can our engineers help you?" 
          rows="4" 
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={isSending}>
          {isSending ? "Sending Request..." : "Talk to an Engineer"}
        </button>
      </form>
    </section>
  );
}

export default Contact;