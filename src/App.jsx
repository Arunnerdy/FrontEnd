import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import AdminDashboard from "./pages/AdminDashboard";
import TeamMemberDashboard from "./pages/TeamMemberDashboard";
import EditUserInfo from "./pages/EditUserInfo";

function AppWrapper() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // 1️⃣ initial value

  useEffect(() => {
    // 1️⃣ keep it in sync on every route change
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location.pathname]);

  // 2️⃣ hide navbar on login & register routes
  const hideNavbarRoutes = ["/", "/register"];
  const showNavbar = isAuthenticated && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project-manager-dashboard" element={<ProjectManagerDashboard />} />
          <Route path="/projects" element={<AdminDashboard />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/team-member-dashboard" element={<TeamMemberDashboard />} />
          <Route 
              path="/edit-user-info" 
              element={
                <EditUserInfo />
              } 
            />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
