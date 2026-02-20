import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";


const API_BASE = import.meta.env.VITE_API_URL;
console.log("API_BASE:", API_BASE);

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();

    try {
  console.log("Attempting login with:", email);

  const res = await axios.post(
    `${API_BASE}/api/admin/login`,
    { email, password }
  );

  if (res.status === 200 && res.data.token) {
    localStorage.setItem("token", res.data.token);
    navigate("/admin/dashboard");
  }

} catch (err) {
  console.error("Full Error:", err);

  // Backend responded with error (400, 401, 500 etc.)
  if (err.response) {
    const status = err.response.status;
    const message = err.response.data?.message;

    if (status === 400 || status === 401) {
      alert(message || "Invalid credentials");
    } else if (status === 500) {
      alert("Server error. Please try again later.");
    } else {
      alert(message || "Something went wrong.");
    }
  } 
  // No response from backend (network issue, CORS, wrong URL)
  else if (err.request) {
    alert("Unable to connect to server.");
  } 
  // Something else broke
  else {
    alert("Unexpected error occurred.");
  }
}
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
