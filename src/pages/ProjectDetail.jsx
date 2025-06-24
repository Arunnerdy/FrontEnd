"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    assignee: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - different projects based on ID
    const mockProjects = {
      1: {
        id: 1,
        name: "Website Redesign",
        description: "Complete redesign of company website with modern UI/UX",
        status: "In Progress",
        startDate: "2024-01-01",
        endDate: "2024-02-15",
        manager: "Manoj C",
        teamMembers: ["Manoj C", "Jane Smith", "Mike Johnson", "Sarah Wilson", "Tom Brown"],
      },
      2: {
        id: 2,
        name: "Mobile App Development",
        description: "Native mobile app for iOS and Android platforms",
        status: "Planning",
        startDate: "2024-02-01",
        endDate: "2024-03-20",
        manager: "Jane Smith",
        teamMembers: ["Jane Smith", "Alex Rodriguez", "Emily Chen", "David Park", "Lisa Wang"],
      },
      3: {
        id: 3,
        name: "Database Migration",
        description: "Migrate legacy database to new cloud infrastructure",
        status: "Completed",
        startDate: "2023-11-01",
        endDate: "2023-12-15",
        manager: "Mike Johnson",
        teamMembers: ["Mike Johnson", "Sarah Connor", "John Doe"],
      },
      4: {
        id: 4,
        name: "UI Revamp",
        description: "Redesign the user interface for better UX",
        status: "In Progress",
        startDate: "2024-01-10",
        endDate: "2024-03-05",
        manager: "Sara Lee",
        teamMembers: ["Sara Lee", "Kevin Liu", "Maria Garcia", "James Wilson", "Anna Kim"],
      },
      5: {
        id: 5,
        name: "Security Audit",
        description: "Conduct a full security audit of the system",
        status: "Completed",
        startDate: "2024-04-01",
        endDate: "2024-04-30",
        manager: "David Kim",
        teamMembers: ["David Kim", "Rachel Green"],
      },
    }

    const mockTasksData = {
      1: [
        {
          id: 1,
          title: "Design Homepage",
          description: "Create wireframes and mockups for the homepage",
          priority: "High",
          status: "In Progress",
          dueDate: "2024-01-25",
          assignee: "Jane Smith",
        },
        {
          id: 2,
          title: "Setup Development Environment",
          description: "Configure development tools and frameworks",
          priority: "Medium",
          status: "Done",
          dueDate: "2024-01-15",
          assignee: "Mike Johnson",
        },
      ],
      2: [
        {
          id: 3,
          title: "Create App Architecture",
          description: "Design the overall app architecture",
          priority: "High",
          status: "To Do",
          dueDate: "2024-02-10",
          assignee: "Alex Rodriguez",
        },
      ],
      3: [
        {
          id: 4,
          title: "Data Migration",
          description: "Migrate data to new system",
          priority: "High",
          status: "Done",
          dueDate: "2023-12-01",
          assignee: "Sarah Connor",
        },
      ],
      4: [
        {
          id: 5,
          title: "UI Design",
          description: "Create new UI designs",
          priority: "Medium",
          status: "In Progress",
          dueDate: "2024-02-15",
          assignee: "Maria Garcia",
        },
      ],
      5: [
        {
          id: 6,
          title: "Security Check",
          description: "Perform security audit",
          priority: "High",
          status: "Done",
          dueDate: "2024-04-15",
          assignee: "Rachel Green",
        },
      ],
    }

    const projectId = Number.parseInt(id)
    const selectedProject = mockProjects[projectId]
    const selectedTasks = mockTasksData[projectId] || []

    setTimeout(() => {
      if (selectedProject) {
        setProject(selectedProject)
        setTasks(selectedTasks)
      }
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddTask = (e) => {
    e.preventDefault()

    if (!newTask.title || !newTask.dueDate) {
      alert("Please fill in required fields")
      return
    }

    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: "To Do",
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      assignee: "",
    })
    setShowAddTask(false)
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high"
      case "Medium":
        return "priority-medium"
      case "Low":
        return "priority-low"
      default:
        return ""
    }
  }

  if (loading) {
    return <div className="loading">Loading project details...</div>
  }

  if (!project) {
    return <div className="alert alert-danger">Project not found</div>
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="breadcrumb-item active">{project.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1>{project.name}</h1>
                <span className={`badge ${getStatusBadgeClass(project.status)} fs-6`}>{project.status}</span>
              </div>
              <p className="lead">{project.description}</p>

              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Start Date:</strong> {project.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {project.endDate}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Project Manager:</strong> {project.manager}
                  </p>
                  <p>
                    <strong>Manager Email:</strong> {project.managerEmail}
                  </p>
                  <p>
                    <strong>Team Size:</strong> {project.teamMembers.length} members
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header d-flex justify-content-between align-items-center">
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
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Task Title *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newTask.title}
                          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Due Date *</label>
                        <input
                          type="date"
                          className="form-control"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Priority</label>
                        <select
                          className="form-select"
                          value={newTask.priority}
                          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Assignee</label>
                        <select
                          className="form-select"
                          value={newTask.assignee}
                          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                        >
                          <option value="">Select assignee</option>
                          {project.teamMembers.map((member) => (
                            <option key={member} value={member}>
                              {member}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success btn-sm">
                    Add Task
                  </button>
                </form>
              )}

              {tasks.length === 0 ? (
                <p>No tasks yet. Add the first task to get started!</p>
              ) : (
                <div className="row">
                  <div className="col-md-4">
                    <h6>To Do</h6>
                    {tasks
                      .filter((task) => task.status === "To Do")
                      .map((task) => (
                        <div key={task.id} className="card task-card mb-2">
                          <div className="card-body p-3">
                            <h6 className="card-title">{task.title}</h6>
                            <p className="card-text small">{task.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className={`small ${getPriorityClass(task.priority)}`}>{task.priority}</span>
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
                            <small className="text-muted">
                              Due: {task.dueDate} | {task.assignee}
                            </small>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="col-md-4">
                    <h6>In Progress</h6>
                    {tasks
                      .filter((task) => task.status === "In Progress")
                      .map((task) => (
                        <div key={task.id} className="card task-card in-progress mb-2">
                          <div className="card-body p-3">
                            <h6 className="card-title">{task.title}</h6>
                            <p className="card-text small">{task.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className={`small ${getPriorityClass(task.priority)}`}>{task.priority}</span>
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
                            <small className="text-muted">
                              Due: {task.dueDate} | {task.assignee}
                            </small>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="col-md-4">
                    <h6>Done</h6>
                    {tasks
                      .filter((task) => task.status === "Done")
                      .map((task) => (
                        <div key={task.id} className="card task-card done mb-2">
                          <div className="card-body p-3">
                            <h6 className="card-title">{task.title}</h6>
                            <p className="card-text small">{task.description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className={`small ${getPriorityClass(task.priority)}`}>{task.priority}</span>
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
                            <small className="text-muted">
                              Due: {task.dueDate} | {task.assignee}
                            </small>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Team Members</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {project.teamMembers.map((member, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center">
                    <div
                      className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: "40px", height: "40px", color: "white" }}
                    >
                      {member
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div>{member}</div>
                      {member === project.manager && <small className="text-muted">Project Manager</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5>Project Stats</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
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
