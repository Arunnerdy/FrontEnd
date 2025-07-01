import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard"
// import Projects from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail"
import CreateProject from "./pages/CreateProject"
import CreateTask from "./pages/CreateTask"
import AdminDashboard from "./pages/AdminDashboard"
import TeamMemberDashboard from "./pages/TeamMemberDashboard"
// import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
              <Route
                path="/"
                element={
                  
                    <ProjectManagerDashboard />
                 
                }
              />
              <Route
                path="/projects"
                element={
                  
                    <AdminDashboard />
                  
                }
              />
              <Route
                path="/projects/create"
                element={
                 
                    <CreateProject />
                 
                }
              />
              <Route
                path="/projects/:id"
                element={
                  
                    <ProjectDetail />
                 
                }
              />
              <Route
                path="/create-task"
                element={
                  
                    <CreateTask />
                 
                }
              />
              <Route
                path="/team-member-dashboard"
                element={
                  
                    <TeamMemberDashboard />
                 
                }
              />
            </Routes>
            
          </div>
        </div>
      </Router>
    
  )
}

export default App
