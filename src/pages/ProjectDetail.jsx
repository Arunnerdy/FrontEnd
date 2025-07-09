import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    dueDate: "",
    assigneeEmail: "",
    assigneeName: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")

        const projectRes = await axios.get(`http://localhost:8080/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setProject(projectRes.data)

        const taskRes = await axios.get(`http://localhost:8080/api/projects/${id}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTasks(taskRes.data)
      } catch (error) {
        console.error("Error fetching project or tasks", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleAddTask = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    if (!newTask.title || !newTask.dueDate || !newTask.assigneeEmail || !newTask.assigneeName) {
      alert("Please fill all required fields")
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/tasks`,
        {
          ...newTask,
          projectId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setTasks([...tasks, response.data])
      setNewTask({
        title: "",
        description: "",
        status: "To Do",
        dueDate: "",
        assigneeEmail: "",
        assigneeName: "",
      })
      setShowAddTask(false)
    } catch (err) {
      console.error("Error adding task", err)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem("token")
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${taskId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      )
    } catch (error) {
      console.error("Failed to update task status", error)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Done":
        return "bg-success"
      case "In Progress":
        return "bg-warning"
      case "To Do":
        return "bg-info"
      default:
        return "bg-secondary"
    }
  }

  if (loading) return <div className="loading">Loading project details...</div>
  if (!project) return <div className="alert alert-danger">Project not found</div>

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">{project.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-8">
          {/* Project Info */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1>{project.name}</h1>
                <span className={`badge ${getStatusBadgeClass(project.status)} fs-6`}>{project.status}</span>
              </div>
              <p className="lead">{project.description}</p>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Start:</strong> {project.startDate}</p>
                  <p><strong>End:</strong> {project.endDate}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Manager:</strong> {project.managerName}</p>
                  <p><strong>Email:</strong> {project.managerEmail}</p>
                  <p><strong>Team:</strong> {project.teamMembers.length} members</p>
                </div>
              </div>
            </div>
          </div>

          {/* Task Section */}
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5>Tasks</h5>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddTask(!showAddTask)}>
                {showAddTask ? "Cancel" : "Add Task"}
              </button>
            </div>
            <div className="card-body">
              {showAddTask && (
                <form onSubmit={handleAddTask} className="mb-4 p-3 bg-light rounded">
                  <h6>Add New Task</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Due Date *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Status</label>
                      <select
                        className="form-select"
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Assignee Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newTask.assigneeName}
                        onChange={(e) => setNewTask({ ...newTask, assigneeName: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Assignee Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={newTask.assigneeEmail}
                        onChange={(e) => setNewTask({ ...newTask, assigneeEmail: e.target.value })}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success btn-sm">Create</button>
                </form>
              )}

              {/* Kanban Board */}
              <div className="row">
                {["To Do", "In Progress", "Done"].map((status) => (
                  <div className="col-md-4" key={status}>
                    <h6>{status}</h6>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <div key={task.id} className="card task-card mb-2">
                          <div className="card-body p-3">
                            <h6 className="card-title">{task.title}</h6>
                            <p className="card-text small">{task.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="small text-muted">{task.status}</span>
                              <select
                                className="form-select form-select-sm"
                                value={task.status}
                                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                style={{ width: "auto" }}
                              >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                              </select>
                            </div>
                            <small className="text-muted">Due: {task.dueDate} | {task.assignee}</small>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-header">
              <h5>Team Members</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {project.teamMembers.map((member, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center">
                    <div
                      className="bg-primary rounded-circle me-3 text-white d-flex justify-content-center align-items-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      {member.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div>{member}</div>
                      {member === project.managerName && <small className="text-muted">Project Manager</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5>Task Stats</h5>
            </div>
            <div className="card-body text-center">
              <div className="row">
                <div className="col-4">
                  <h4 className="text-info">{tasks.filter((t) => t.status === "To Do").length}</h4>
                  <small>To Do</small>
                </div>
                <div className="col-4">
                  <h4 className="text-warning">{tasks.filter((t) => t.status === "In Progress").length}</h4>
                  <small>In Progress</small>
                </div>
                <div className="col-4">
                  <h4 className="text-success">{tasks.filter((t) => t.status === "Done").length}</h4>
                  <small>Done</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
