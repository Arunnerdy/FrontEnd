import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([]) // You can later fetch tasks assigned to the user
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get("http://localhost:8080/api/projects/my-projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const userProjects = res.data

        // Optional: Format projects to match mock structure
        const formattedProjects = userProjects.map((proj) => ({
          id: proj.id,
          name: proj.name,
          status: proj.status,
          dueDate: proj.endDate,
          tasksCount: 0, // Replace with actual count when task data is integrated
        }))

        setProjects(formattedProjects)
      } catch (error) {
        console.error("Failed to fetch projects for user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
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
                        <small className="text-muted">Due: {project.dueDate}</small>
                      </div>
                      <p className="mb-1">Status: {project.status}</p>
                      <small>{project.tasksCount} tasks</small>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

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
                        <small className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</small>
                      </div>
                      <p className="mb-1">{task.project}</p>
                      <small>
                        Due: {task.dueDate} | Status: {task.status}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
