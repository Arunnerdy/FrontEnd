import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  // ✅ Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:8080/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = response.data
        setProjects(data)
        setFilteredProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // ✅ Filtering
  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, statusFilter])

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success"
      case "In Progress":
        return "bg-warning"
      case "Planning":
        return "bg-info"
      default:
        return "bg-secondary"
    }
  }

  if (loading) {
    return <div className="loading">Loading projects...</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Projects</h1>
        <Link to="/projects/create" className="btn btn-primary">
          Create New Project
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProjects.length === 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center">
                <h5>No projects found</h5>
                <p>Try adjusting your search or filters, or create a new project.</p>
                <Link to="/projects/create" className="btn btn-primary">
                  Create New Project
                </Link>
              </div>
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">{project.name}</h5>
                    <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="card-text">{project.description}</p>
                  <div className="mb-2">
                    <small className="text-muted">
                    <strong>Manager:</strong> {project.managerName} ({project.managerEmail})
                    <br />
                    <strong>Duration:</strong> {project.startDate} to {project.endDate}
                  </small>

                  </div>
                  <Link to={`/projects/${project.id}`} className="btn btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Projects
