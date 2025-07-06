
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockProjects = [
      {
        id: 1,
        name: "Website Redesign",
        description: "Complete redesign of company website with modern UI/UX",
        status: "In Progress",
        startDate: "2024-01-01",
        endDate: "2024-02-15",
        manager: "Manoj C",
        teamMembers: 5,
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Native mobile app for iOS and Android platforms",
        status: "Planning",
        startDate: "2024-02-01",
        endDate: "2024-03-20",
        manager: "Jane Smith",
        teamMembers: 5,
      },
      {
        id: 3,
        name: "Database Migration",
        description: "Migrate legacy database to new cloud infrastructure",
        status: "Completed",
        startDate: "2023-11-01",
        endDate: "2023-12-15",
        manager: "Mike Johnson",
        teamMembers: 3,
      },
      {
        id: 4,
        name: "UI Revamp",
        description: "Redesign the user interface for better UX",
        status: "In Progress",
        startDate: "2024-01-10",
        endDate: "2024-03-05",
        manager: "Sara Lee",
        teamMembers: 5,
      },
      {
        id: 5,
        name: "Security Audit",
        description: "Conduct a full security audit of the system",
        status: "Completed",
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        manager: "David Kim",
        teamMembers: 2,
      },
    ]

    setTimeout(() => {
      setProjects(mockProjects)
      setFilteredProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
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
        <Link to="/projects/create" className="btn btn-secondary btn-black-white">
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
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
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
                    <span className={`badge ${getStatusBadgeClass(project.status)}`}>{project.status}</span>
                  </div>
                  <p className="card-text">{project.description}</p>
                  <div className="mb-2">
                    <small className="text-muted">
                      <strong>Manager:</strong> {project.manager}
                      <br />
                      <strong>Team:</strong> {project.teamMembers} members
                      <br />
                      <strong>Duration:</strong> {project.startDate} to {project.endDate}
                    </small>
                  </div>
                  <Link to={`/projects/${project.id}`} className="btn btn1-outline-primary">
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
