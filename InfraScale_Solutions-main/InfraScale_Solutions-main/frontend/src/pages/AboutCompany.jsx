import { useEffect, useState } from "react";
import axios from "axios";
import "./AboutCompany.css";



const API_BASE = import.meta.env.VITE_API_URL;

const API = `${API_BASE}/api/about`;

function AboutCompany() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios.get(API).then(res => setAbout(res.data));
  }, []);

  if (!about) return null;

  return (
    <div className="about-wrapper">
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>{about.description}</p>
      </section>

      <section className="mission-vision">
        <div>
          <h3>Our Mission</h3>
          <p>{about.mission}</p>
        </div>
        <div>
          <h3>Our Vision</h3>
          <p>{about.vision}</p>
        </div>
      </section>

      <section className="values">
        <h3>Our Core Values</h3>
        <ul>
          {about.values?.map((val, i) => (
            <li key={i}>{val}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AboutCompany;