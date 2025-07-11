import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/projects/my-projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProjects(res.data) // ✅ Use original response
      } catch (error) {
        console.error("❌ Failed to fetch projects:", error)
      }
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/my-tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTasks(res.data)
      } catch (error) {
        console.error("❌ Failed to fetch tasks:", error)
      }
    }

    const fetchData = async () => {
      await Promise.all([fetchProjects(), fetchTasks()])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome back!</h1>
        <Link to="/create-task" className="btn btn-primary">
          Create New Task
        </Link>
      </div>

      <div className="row">
        {/* My Projects */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>My Projects</h5>
            </div>
            <div className="card-body">
              {projects.length === 0 ? (
                <p>
                  No projects found. <Link to="/projects/create">Create your first project</Link>
                </p>
              ) : (
                <div className="list-group list-group-flush">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{project.name}</h6>
                        <small className="text-muted">Due: {project.endDate}</small>
                      </div>
                      <p className="mb-1">Status: {project.status}</p>
                      <small>{project.tasks?.length || 0} tasks</small>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* My Tasks + Stats */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>My Tasks</h5>
            </div>
            <div className="card-body">
              {tasks.length === 0 ? (
                <p>No tasks assigned to you.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {tasks.map((task) => (
                    <div key={task.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{task.title}</h6>
                        <small className={`priority-${(task.priority || task.urgency || "").toLowerCase()}`}>
                          {(task.priority || task.urgency || "").toUpperCase()}
                        </small>
                      </div>
                      <p className="mb-1">{task.project?.name || "No Project"}</p>
                      <small>
                        Due: {task.dueDate} | Status: {task.status || "To Do"}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mt-3">
            <div className="card-header">
              <h5>Quick Stats</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6">
                  <h3 className="text-primary">{projects.length}</h3>
                  <p>My Projects</p>
                </div>
                <div className="col-6">
                  <h3 className="text-success">{tasks.length}</h3>
                  <p>My Tasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
