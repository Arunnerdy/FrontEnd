
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  // const { currentUser } = useAuth()
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would fetch from API
    const mockProjects = [
      {
        id: 1,
        name: "Website Redesign",
        status: "In Progress",
        dueDate: "2024-02-15",
        tasksCount: 2,
      },
      {
        id: 2,
        name: "Mobile App Development",
        status: "Planning",
        dueDate: "2024-03-20",
        tasksCount: 1,
      },
      {
        id: 3,
        name: "Database Migration",
        status: "Completed",
        dueDate: "2023-12-15",
        tasksCount: 1,
      },
      {
        id: 4,
        name: "UI Revamp",
        status: "In Progress",
        dueDate: "2024-03-05",
        tasksCount: 1,
      },
      {
        id: 5,
        name: "Security Audit",
        status: "Completed",
        dueDate: "2024-04-30",
        tasksCount: 1,
      },
    ]

    const mockTasks = [
      {
        id: 1,
        title: "Design Homepage",
        project: "Website Redesign",
        priority: "High",
        dueDate: "2024-01-25",
        status: "In Progress",
      },
      {
        id: 2,
        title: "Setup Database",
        project: "Mobile App Development",
        priority: "Medium",
        dueDate: "2024-01-30",
        status: "To Do",
      },
      {
        id: 3,
        title: "User Authentication",
        project: "Mobile App Development",
        priority: "High",
        dueDate: "2024-02-05",
        status: "In Progress",
      }
    ]

    setTimeout(() => {
      setProjects(mockProjects)
      setTasks(mockTasks)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome back, Manoj C !</h1>
        <Link to="/create-task" className="btn btn-primary">
          Create New Task
        </Link>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Recent Projects</h5>
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
                  <p>Active Projects</p>
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
