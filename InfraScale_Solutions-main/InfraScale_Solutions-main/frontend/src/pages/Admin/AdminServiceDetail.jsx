import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./AdminServiceDetail.css";

const API_BASE = import.meta.env.VITE_API_URL;

function AdminServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/services/${id}`);
      setService(res.data);
    } catch (err) {
      toast.error("Failed to load service");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API_BASE}/api/services/${id}`,
        service,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setService(res.data);
      setEditMode(false);
      toast.success("Service updated successfully!");
    } catch (err) {
      toast.error("Failed to update service");
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading service details...</div>;
  if (!service) return <div className="error">Service not found</div>;

  return (
    <div className="admin-service-detail">
      <button className="back-btn" onClick={() => navigate("/admin/services")}>
        ← Back to Services
      </button>

      <div className="service-detail-card">
        <h2>{service.category}</h2>

        {editMode ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={service.category}
                onChange={(e) => setService({ ...service, category: e.target.value })}
                placeholder="Service Category"
              />
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={service.title || ""}
                onChange={(e) => setService({ ...service, title: e.target.value })}
                placeholder="Service Title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                value={service.description || ""}
                onChange={(e) => setService({ ...service, description: e.target.value })}
                placeholder="Service Description"
              />
            </div>

            <div className="form-group">
              <label>Detailed Report / Features</label>
              <textarea
                rows="8"
                value={service.detailedReport || ""}
                onChange={(e) => setService({ ...service, detailedReport: e.target.value })}
                placeholder="Add detailed report, benefits, features, and technical details here..."
              />
            </div>

            <div className="button-group">
              <button className="save-btn" onClick={handleUpdate}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <div className="info-section">
              <h3>Title</h3>
              <p>{service.title || "N/A"}</p>
            </div>

            <div className="info-section">
              <h3>Description</h3>
              <p>{service.description || "N/A"}</p>
            </div>

            <div className="info-section">
              <h3>Detailed Report</h3>
              <p className="detailed-report">
                {service.detailedReport || "No detailed report added yet"}
              </p>
            </div>

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminServiceDetail;
