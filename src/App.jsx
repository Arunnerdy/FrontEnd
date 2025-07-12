import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";

function AppWrapper() {
  const location = useLocation();

  // keep auth state in sync with localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location.pathname]);

  // hide navbar on login & register
  const hideNavbarRoutes = ["/", "/register"];
  const showNavbar =
    isAuthenticated && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="container mt-4">
        <Routes>
          {/* ────────────────────── PUBLIC ────────────────────── */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ───────────── PROJECT CREATION & DETAILS ─────────── */}
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/create-task" element={<CreateTask />} />

          {/* ──────────────────── USER PROFILE ────────────────── */}
          <Route path="/edit-user-info" element={<EditUserInfo />} />

          {/* ─────────────────── PROTECTED ROUTES ─────────────── */}
          {/* Project‑manager dashboard */}
          <Route
            path="/project-manager-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ROLE_PROJECT_MANAGER"]}>
                <ProjectManagerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin dashboard */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Team‑member dashboard */}
          <Route
            path="/team-member-dashboard"
            element={
              <ProtectedRoute allowedRoles={["ROLE_TEAM_MEMBER"]}>
                <TeamMemberDashboard />
              </ProtectedRoute>
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
