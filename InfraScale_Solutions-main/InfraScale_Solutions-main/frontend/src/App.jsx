import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import AboutCompany from "./pages/AboutCompany";
import Team from "./components/Team/Team";
import Services from "./components/Services/Services";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminTeam from "./pages/Admin/AdminTeam";
import AdminServices from "./pages/Admin/AdminServices";
import AdminAbout from "./pages/Admin/AdminAbout";
import ProtectedRoute from "./components/ProtectedRoute";
import ServicesPage from "./pages/ServicesPage";
import Navbar from "./components/Navbar/Navbar"; 
import MemberLogin from "./pages/TeamMember/MemberLogin"; // Fixed typo in name
import MemberRegister from "./pages/TeamMember/MemberRegister";
import MemberDashboard from "./pages/TeamMember/MemberDashboard";
import MemberProfile from "../src/pages/TeamMember/MemberProfile";


function AppContent() {
  const location = useLocation();

  // Logic to hide Navbar on Admin, Login, and Dashboard routes
  // This ensures the Member Dashboard feels like a private workstation
  const hideNavbar = 
    location.pathname.startsWith("/admin") || 
    location.pathname === "/admin-login" ||
    location.pathname === "/member-login" ||
    location.pathname === "/member-register" ||
    location.pathname === "/member-dashboard";

  return (
    <>
      {/* Navbar renders only for public website pages */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about/company" element={<AboutCompany />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/services/:categoryName" element={<ServicesPage />} />
        <Route path="/team/:id" element={<MemberProfile/>} />
        
        {/* --- MEMBER AUTHENTICATION ROUTES --- */}
        <Route path="/member-login" element={<MemberLogin />} />
        <Route path="/member-register" element={<MemberRegister />} />
        
        {/* --- PROTECTED MEMBER ROUTES --- */}
        <Route 
          path="/member-dashboard" 
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* --- ADMIN AUTHENTICATION --- */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* These render inside AdminLayout's <Outlet /> */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="about" element={<AdminAbout />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
