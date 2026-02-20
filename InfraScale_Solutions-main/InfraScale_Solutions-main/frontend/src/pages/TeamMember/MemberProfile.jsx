import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./MemberProfile.css";

const API_BASE = import.meta.env.VITE_API_URL;

function MemberProfilePage() {
  const { id } = useParams();   // ✅ use id not authId
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("❌ Member ID is undefined");
      return;
    }
    console.log("📋 Fetching team member:", id);
    axios
      .get(`${API_BASE}/api/team/${id}`)
      .then(res => {
        console.log("✅ Team member loaded:", res.data);
        setProfile(res.data);
      })
      .catch(err => console.error("❌ Error loading profile:", err));
  }, [id]);

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      
      <div className="profile-header">
        <img
          src={profile.image ? `${API_BASE}/uploads/${profile.image}` : "/placeholder.png"}
          alt={profile.name}
          onError={(e) => {
            console.error("❌ Profile image failed:", e.target.src);
            e.target.src = "/placeholder.png";
          }}
        />
        <div>
          <h1>{profile.name}</h1>
          <h3>{profile.designation}</h3>
          <p>{profile.department}</p>
          <p><strong>Specialization:</strong> {profile.specialization}</p>
          <p><strong>Experience:</strong> {profile.experience} Years</p>
        </div>
      </div>

      <div className="profile-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {profile.skills?.map((skill, i) => (
            <span key={i} className="skill-badge">{skill}</span>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h2>Projects</h2>
        {profile.projects?.map((project, i) => (
          <div key={i} className="project-card">
            <h4>{project.title}</h4>
            <p>{project.technologies?.join(", ")}</p>
          </div>
        ))}
      </div>

      <div className="profile-section">
        <h2>Work Experience</h2>
        {profile.workExperience?.map((work, i) => (
          <div key={i} className="work-card">
            <h4>{work.company}</h4>
            <p>{work.designation}</p>
            <span>{work.duration}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MemberProfilePage;