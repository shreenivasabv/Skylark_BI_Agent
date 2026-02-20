import { useEffect, useState } from "react";
import axios from "axios";
import "./Services.css";

const API_BASE = import.meta.env.VITE_API_URL;

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/api/services`)
      .then(res => setServices(res.data));
  }, []);

  return (
    <div className="services-page">
      <h1>Our Services</h1>

      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service._id}>
            <img src={service.image} alt={service.title} />
            <div className="overlay">
              <h2>{service.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
