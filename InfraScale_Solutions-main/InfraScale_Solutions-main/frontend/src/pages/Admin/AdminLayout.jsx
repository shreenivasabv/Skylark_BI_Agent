import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
const API_BASE = import.meta.env.VITE_API_URL;

function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>INFRASCALE</h2>

        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/team">Manage Team</Link>
        <Link to="/admin/services">Manage Services</Link>
        <Link to="/admin/about">Manage About</Link>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
