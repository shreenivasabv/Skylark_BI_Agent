import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleMouseEnter = (menu) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">INFRASCALE</Link>
      </div>

      <ul className={`nav-links ${showMobileMenu ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
        </li>

        <li 
          className="dropdown" 
          onMouseEnter={() => handleMouseEnter("about")} 
          onMouseLeave={handleMouseLeave}
        >
          <span>About Us ▾</span>
          {openMenu === "about" && (
            <ul className="dropdown-menu">
              <li><Link to="/about/company">Company</Link></li>
              <li><Link to="/team">Team</Link></li>
            </ul>
          )}
        </li>

        <li 
          className="dropdown" 
          onMouseEnter={() => handleMouseEnter("solutions")} 
          onMouseLeave={handleMouseLeave}
        >
          <span>Our Expertise ▾</span>
          {openMenu === "solutions" && (
            <ul className="dropdown-menu">
              {/* IMPORTANT: These 'to' paths should match the 
                  'category' strings you save in your database.
              */}
              <li>
                <Link to="/services/Virtualization" onClick={() => setShowMobileMenu(false)}>
                  Virtualization
                </Link>
              </li>
              <li>
                <Link to="/services/StorageBackup" onClick={() => setShowMobileMenu(false)}>
                  Storage & Backup
                </Link>
              </li>
              <li>
                <Link to="/services/DevOps" onClick={() => setShowMobileMenu(false)}>
                  DevOps
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li><a href="#contact">Contact Us</a></li>
      </ul>

      <div 
        className="three-dot-container" 
        onMouseEnter={() => handleMouseEnter("admin")} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="three-dot">⋮</div>
        
        {openMenu === "admin" && (
          <div className="admin-dropdown">
            {isLoggedIn ? (
              <>
                <Link to="/member-dashboard">Dashboard</Link>
                <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin-login">Admin Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;