/* =========================================================
   ProjectDetail.jsx  —  with simple polling every 10 seconds
   ========================================================= */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/* ---------- polling helper ---------- */
function usePolling(url, interval = 10000) {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const auth  = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!url) return;

    let cancel = false;

    async function fetchOnce() {
      try {
        const res = await axios.get(url, auth);
        if (!cancel) setData(res.data);
      } catch (err) {
        console.error(`Polling error for ${url}:`, err);
      }
    }

    fetchOnce();
    const id = setInterval(fetchOnce, interval);
    return () => {
      cancel = true;
      clearInterval(id);
    };
  }, [url, interval]);

  return [data, setData];
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    dueDate: "",
    assigneeEmail: "",
    assigneeName: "",
  });

  /* -------- poll project & tasks -------- */
  const [project] = usePolling(
    `http://localhost:8080/api/projects/${id}`,
    10000
  );
  const [tasks, setTasks] = usePolling(
    `http://localhost:8080/api/projects/${id}/tasks`,
    10000
  );

  /* fallback while loading */
  if (!project || !tasks) return <div className="loading">Loading project details...</div>;

  /* ---------- add task ---------- */
  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!newTask.title || !newTask.dueDate || !newTask.assigneeEmail || !newTask.assigneeName) {
      alert("Please fill all required fields");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/tasks",
        { ...newTask, projectId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) => [...prev, res.data]);   // optimistic local append
      setNewTask({
        title: "",
        description: "",
        status: "To Do",
        dueDate: "",
        assigneeEmail: "",
        assigneeName: "",
      });
      setShowAddTask(false);
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  /* ---------- update task status ---------- */
  const updateTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${taskId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const badge = (status) =>
    status === "Done" ? "bg-success"
    : status === "In Progress" ? "bg-warning"
    : "bg-info";

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">{project.name}</li>
        </ol>
      </nav>

      <div className="row">
        {/* ------------ main column ------------ */}
        <div className="col-md-8">
          {/* Project Info */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1>{project.name}</h1>
                <span className={`badge ${badge(project.status)} fs-6`}>
                  {project.status}
                </span>
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

          {/* Tasks + add form */}
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
                  {/* form fields (same as before) */}
                  {/* Title */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Title *</label>
                      <input className="form-control"
                        value={newTask.title}
                        onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Due Date *</label>
                      <input type="date" className="form-control"
                        value={newTask.dueDate}
                        onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Status</label>
                      <select className="form-select"
                        value={newTask.status}
                        onChange={e => setNewTask({ ...newTask, status: e.target.value })}>
                        <option>To Do</option><option>In Progress</option><option>Done</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Assignee Name *</label>
                      <input className="form-control"
                        value={newTask.assigneeName}
                        onChange={e => setNewTask({ ...newTask, assigneeName: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Assignee Email *</label>
                      <input type="email" className="form-control"
                        value={newTask.assigneeEmail}
                        onChange={e => setNewTask({ ...newTask, assigneeEmail: e.target.value })} />
                    </div>
                    <div className="col-12 mb-3">
                      <label>Description</label>
                      <textarea rows="2" className="form-control"
                        value={newTask.description}
                        onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                    </div>
                  </div>
                  <button className="btn btn-success btn-sm">Create</button>
                </form>
              )}

              {/* Kanban board */}
              <div className="row">
                {["To Do", "In Progress", "Done"].map((status) => (
                  <div className="col-md-4" key={status}>
                    <h6>{status}</h6>
                    {tasks
                      .filter((t) => t.status === status)
                      .map((t) => (
                        <div key={t.id} className="card task-card mb-2">
                          <div className="card-body p-3">
                            <h6 className="card-title">{t.title}</h6>
                            <p className="card-text small">{t.description}</p>
                            <div className="d-flex justify-content-between">
                              <span className="small text-muted">{t.status}</span>
                              <select
                                className="form-select form-select-sm"
                                value={t.status}
                                onChange={(e) => updateTaskStatus(t.id, e.target.value)}
                                style={{ width: "auto" }}
                              >
                                <option>To Do</option><option>In Progress</option><option>Done</option>
                              </select>
                            </div>
                            <small className="text-muted">
                              Due: {t.dueDate} | {t.assignee}
                            </small>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ------------ sidebar ------------ */}
        <div className="col-md-4">
          {/* Team */}
          <div className="card mb-3">
            <div className="card-header"><h5>Team Members</h5></div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {project.teamMembers.map((m, i) => (
                  <li key={i} className="list-group-item d-flex align-items-center">
                    <div className="bg-primary rounded-circle me-3 text-white d-flex justify-content-center align-items-center"
                         style={{ width: 40, height: 40 }}>
                      {m.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      {m}
                      {m === project.managerName && <small className="d-block text-muted">Project Manager</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <div className="card-header"><h5>Task Stats</h5></div>
            <div className="card-body text-center">
              <div className="row">
                <div className="col-4">
                  <h4 className="text-info">{tasks.filter(t => t.status === "To Do").length}</h4>
                  <small>To Do</small>
                </div>
                <div className="col-4">
                  <h4 className="text-warning">{tasks.filter(t => t.status === "In Progress").length}</h4>
                  <small>In Progress</small>
                </div>
                <div className="col-4">
                  <h4 className="text-success">{tasks.filter(t => t.status === "Done").length}</h4>
                  <small>Done</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
