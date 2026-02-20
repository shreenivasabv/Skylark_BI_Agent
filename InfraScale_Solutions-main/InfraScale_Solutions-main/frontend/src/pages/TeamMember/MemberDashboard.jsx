import { useEffect, useState } from "react";
import axios from "axios";
import "./MemberDashboard.css";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL;

function MemberDashboard() {
  const [member, setMember] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH PROFILE (JWT BASED)
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please login.");
        setLoading(false);
        return;
      }

      // First, get member auth to find teamMemberId
      const authRes = await axios.get(`${API_BASE}/api/members/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("MEMBER AUTH DATA:", authRes.data);

      // If member has teamMemberId, fetch team member details
      if (authRes.data.teamMemberId) {
        const teamRes = await axios.get(`${API_BASE}/api/team/${authRes.data.teamMemberId}`);
        console.log("TEAM MEMBER DATA:", teamRes.data);
        
        setMember({
          ...teamRes.data,
          authId: authRes.data._id,
          email: authRes.data.email,
          _id: authRes.data.teamMemberId
        });
      } else {
        setMember(authRes.data);
      }

    } catch (error) {
      console.error("Failed to fetch profile:", error.response?.data || error.message);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // 🔹 UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const updateData = {
        skills: member.skills || [],
        projects: member.projects || [],
        workExperience: member.workExperience || [],
        designation: member.designation,
        name: member.name,
        specialization: member.specialization,
        experience: member.experience
      };

      await axios.put(`${API_BASE}/api/members/me`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Profile Updated Successfully 🚀");

    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error("Update failed");
    }
  };
  

  if (loading) return <p>Loading profile...</p>;
  if (!member) return <p>Profile not found. Please log in again.</p>;

  return (
    <div className="dashboard-wrapper">
      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-left">
          <img
            src={
              member.image
                ? `${API_BASE}/uploads/${member.image}`
                : "/default-profile.png"
            }
            alt="profile"
            className="profile-image"
            onError={(e) => {
              e.target.src = "/default-profile.png";
            }}
          />
          <div>
            <h2>{member.name || "Your Name"}</h2>
            <p>{member.designation || "Designation"}</p>
            <span>{member.specialization || "Specialization"}</span>
          </div>
        </div>
        <button className="save-btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>

      {/* TABS */}
      <div className="tabs">
        {["general", "skills", "projects", "experience"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="content-card">

        {/* GENERAL */}
        {activeTab === "general" && (
          <div className="grid-2">
            <input
              placeholder="Full Name"
              value={member.name || ""}
              onChange={(e) =>
                setMember({ ...member, name: e.target.value })
              }
            />
            <input
              placeholder="Designation"
              value={member.designation || ""}
              onChange={(e) =>
                setMember({ ...member, designation: e.target.value })
              }
            />
            <input
              placeholder="Specialization"
              value={member.specialization || ""}
              onChange={(e) =>
                setMember({ ...member, specialization: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Experience Years"
              value={member.experience || 0}
              onChange={(e) =>
                setMember({
                  ...member,
                  experience: Number(e.target.value)
                })
              }
            />
          </div>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <div>
            <textarea
              rows="4"
              placeholder="Comma separated skills"
              value={Array.isArray(member.skills) ? member.skills.join(", ") : ""}
              onChange={(e) =>
                setMember({
                  ...member,
                  skills: e.target.value
                    .split(",")
                    .map(s => s.trim())
                    .filter(Boolean)
                })
              }
            />
            <small>Enter skills separated by commas</small>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div className="dynamic-section">
            {member.projects && member.projects.map((proj, index) => (
              <div key={index} className="dynamic-card">
                <input
                  placeholder="Project Title"
                  value={proj.title || ""}
                  onChange={(e) => {
                    const updated = [...member.projects];
                    updated[index].title = e.target.value;
                    setMember({ ...member, projects: updated });
                  }}
                />
                <input
                  placeholder="Technologies"
                  value={(proj.technologies || []).join(", ")}
                  onChange={(e) => {
                    const updated = [...member.projects];
                    updated[index].technologies =
                      e.target.value.split(",").map(t => t.trim());
                    setMember({ ...member, projects: updated });
                  }}
                />
              </div>
            ))}

            <button
              onClick={() =>
                setMember({
                  ...member,
                  projects: [
                    ...(member.projects || []),
                    { title: "", technologies: [] }
                  ]
                })
              }
            >
              + Add Project
            </button>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="dynamic-section">
            {member.workExperience && member.workExperience.map((exp, index) => (
              <div key={index} className="dynamic-card">
                <input
                  placeholder="Company"
                  value={exp.company || ""}
                  onChange={(e) => {
                    const updated = [...member.workExperience];
                    updated[index].company = e.target.value;
                    setMember({ ...member, workExperience: updated });
                  }}
                />
                <input
                  placeholder="Designation"
                  value={exp.designation || ""}
                  onChange={(e) => {
                    const updated = [...member.workExperience];
                    updated[index].designation = e.target.value;
                    setMember({ ...member, workExperience: updated });
                  }}
                />
                <input
                  placeholder="Duration"
                  value={exp.duration || ""}
                  onChange={(e) => {
                    const updated = [...member.workExperience];
                    updated[index].duration = e.target.value;
                    setMember({ ...member, workExperience: updated });
                  }}
                />
              </div>
            ))}

            <button
              onClick={() =>
                setMember({
                  ...member,
                  workExperience: [
                    ...(member.workExperience || []),
                    { company: "", designation: "", duration: "" }
                  ]
                })
              }
            >
              + Add Experience
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default MemberDashboard;