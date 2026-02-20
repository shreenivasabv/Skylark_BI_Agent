import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ServiceDetail.css";

const API_BASE = import.meta.env.VITE_API_URL;

function ServiceDetail() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [category]);

  const fetchService = async () => {
    try {
      // Get services and find matching category
      const res = await axios.get(`${API_BASE}/api/services`);
      const foundService = res.data.find(
        s => s.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
      );
      
      if (foundService) {
        setService(foundService);
      }
    } catch (err) {
      console.error("Failed to load service:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="service-detail-page"><div className="loading">Loading...</div></div>;
  }

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="error">
          <p>Service not found</p>
          <button onClick={() => navigate("/services")}>Back to Services</button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <button className="back-link" onClick={() => navigate("/services")}>
        ← Back to Services
      </button>

      <div className="service-detail-container">
        <div className="service-header">
          <h1>{service.title || service.category}</h1>
          <p className="service-category">{service.category}</p>
        </div>

        {service.description && (
          <div className="service-description">
            <h2>Overview</h2>
            <p>{service.description}</p>
          </div>
        )}

        {service.detailedReport && (
          <div className="service-report">
            <h2>Detailed Report</h2>
            <div className="report-content">
              {service.detailedReport.split("\n").map((line, idx) => (
                <p key={idx}>{line || <br />}</p>
              ))}
            </div>
          </div>
        )}

        {!service.detailedReport && (
          <div className="no-report">
            <p>Detailed report coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetail;
