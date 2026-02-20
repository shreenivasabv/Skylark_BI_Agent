import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Team.css";
import MemberAccessButton from "../MemberAccessButton/MemberAccessButton";

const API_BASE = import.meta.env.VITE_API_URL;

function Team() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/api/team`)
      .then(res => setMembers(res.data))
      .catch(err => console.error("Error fetching team:", err));
  }, []);

  return (
    <div className="team-page">
      <h1>Our Team</h1>

      <div className="team-grid">
        {members.map(member => (
          <div 
            className="team-card" 
            key={member._id}
            onClick={() => navigate(`/team/${member._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img 
              src={member.image ? `${API_BASE}/uploads/${member.image}` : "/placeholder.png"} 
              alt={member.name}
              onError={(e) => {
                console.error("❌ Image failed to load:", e.target.src);
                e.target.src = "/placeholder.png";
              }}
            />

            <h3>{member.name}</h3>
            <p className="designation">{member.designation}</p>
            <p><strong>Specialization:</strong> {member.specialization}</p>
            <p><strong>Experience:</strong> {member.experience} Years</p>

            <ul>
              {(Array.isArray(member.features) 
                ? member.features 
                : JSON.parse(member.features || "[]")
              ).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <MemberAccessButton />
    </div>
  );
}

export default Team;