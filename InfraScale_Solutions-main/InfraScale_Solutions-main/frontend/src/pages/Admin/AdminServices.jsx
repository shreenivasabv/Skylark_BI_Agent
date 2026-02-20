import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; 
import "./AdminServices.css";


const API_BASE = import.meta.env.VITE_API_URL;
function AdminServices() {
  // Initial state includes the category field
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addService = async (e) => {
    e.preventDefault();
    
    if (!image) return toast.error("Please upload an image.");
    
    // Validation to ensure a category is selected before submission
    if (!form.category) return toast.error("Please select a category.");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category); // Appends category to the multipart request
    formData.append("image", image); 

    try {
      const token = localStorage.getItem("token");
      
      await axios.post(`${API_BASE}/api/services`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });
      
      toast.success(`Success! "${form.title}" has been added.`);
      
      // Resets the form state after a successful upload
      setForm({ title: "", description: "", category: "" });
      setImage(null);
      e.target.reset(); 
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server Error";
      toast.error(errorMsg);
      console.error("Detailed Error:", err);
    }
  };

  return (
    <div className="admin-services-container">
      <Toaster position="top-right" reverseOrder={false} />
      
      <h2>Add New Service</h2>
      <form className="service-form" onSubmit={addService}>
        <div className="form-group">
          <label>Service Title</label>
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            required
            className="category-select"
          >
            <option value="">Select a Category</option>
            <option value="Virtualization">Virtualization</option>
            {/* Value 'StorageBackup' matches the URL slug in your Navbar */}
            <option value="StorageBackup">Storage & Backup</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            required 
          />
        </div>

        <button type="submit" className="add-service-btn">
          Upload & Add Service
        </button>
      </form>
    </div>
  );
}

export default AdminServices;