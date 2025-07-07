// TeamMemberDashboard.js
import React, { useEffect, useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import { FaFilter, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* 🔗 Utility helpers                                                 */
/* ------------------------------------------------------------------ */
const mockProjects = [
  { id: "p1", name: "Website Redesign" },
  { id: "p2", name: "Mobile App" },
  { id: "p3", name: "Internal Tool" },
];

/* ------------------------------------------------------------------ */
/* 🖼  Main Component                                                 */
/* ------------------------------------------------------------------ */
export default function TeamMemberDashboard() {
  /* ----------------------------- state ---------------------------- */
  const [username, setUsername] = useState("Username");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [tasks, setTasks] = useState([]);
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  //const navigate = useNavigate(); // keep if you later need it

  /* ------------------------- data fetching ------------------------ */
  useEffect(() => {
    // TODO: replace with GET /api/auth/me
    setUsername("Arun");

    // TODO: replace with GET /api/users/:id/projects
    setProjects(mockProjects);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    // TODO: replace with GET /api/projects/:projectId/tasks
    setTasks([
      {
        id: 1,
        title: "Landing page",
        description: "Create hero section",
        urgency: "immediate",
        dueDate: "2025-04-20",
        completed: false,
      },
      {
        id: 2,
        title: "About page copy",
        description: "Write company story",
        urgency: "medium",
        dueDate: "2025-04-30",
        completed: false,
      },
      {
        id: 3,
        title: "Contact form",
        description: "Integrate email",
        urgency: "not urgent",
        dueDate: "2025-05-05",
        completed: true,
      },
    ]);
  }, [selectedProject]);

  /* -------------------- task completion toggle ------------------- */
  const handleToggleCompletion = async (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: true } : t // one‑way
      )
    );
    // TODO: PATCH /api/tasks/:taskId/complete
  };

  /* -------------------- pending / completed lists ---------------- */
  const pendingTasksAll = useMemo(
    () => tasks.filter((t) => !t.completed),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks]
  );

  /* Apply urgency filter only to pending tasks */
  const pendingTasks = useMemo(() => {
    if (urgencyFilter === "all") return pendingTasksAll;
    return pendingTasksAll.filter((t) => t.urgency === urgencyFilter);
  }, [pendingTasksAll, urgencyFilter]);

  /* ----------------------------------------------------------------
       RENDER
  -----------------------------------------------------------------*/
  if (!selectedProject) {
    /* ----------------------  PROJECT TILES  ---------------------- */
    return (
      <div className="container py-4 mt-5">
        <h1 className="display-5 fw-bold mb-4">
          {username} <span className="fw-light">— Your Projects</span>
        </h1>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {projects.map((p) => (
                    <div className="col" key={p.id}>
                      <button
                        onClick={() => setSelectedProject(p)}
                        className="card h-100 w-100 p-5 text-center border border-dark text-dark fw-bold shadow-sm"
                        style={{ minHeight: "180px", fontSize: "1.3rem" }}
                      >
                       {p.name}
                       </button>
        </div>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-5 text-muted">No projects assigned.</p>
        )}
      </div>
    );
  }

  /* -------------------------  TASK VIEW  ------------------------- */
  return (
    <div className="container py-4">
      {/* Header */}
      <button
        className="btn btn-link text-decoration-none mb-3"
        onClick={() => setSelectedProject(undefined)}
      >
        <FaArrowLeft className="me-2 fw-bold" />
        Back to Projects
      </button>

      <h1 className="display-6 fw-bold mb-4">
        {selectedProject.name} <span className="fw-light">Tasks</span>
      </h1>

      <div className="row g-4">
        {/* ---------- LEFT: Task lists ---------- */}
        <div className="col-12 col-md-8">
          {/* Pending */}
          <section className="mb-5">
            <div className="d-flex align-items-center mb-3">
              <h2 className="h4 fw-semibold mb-0">Pending Tasks</h2>
              <div className="ms-auto d-flex align-items-center gap-2">
                <FaFilter className="text-muted" title="Filter by urgency" />
                <select
                  className="form-select form-select-sm w-auto"
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                >
                  <option value="all">All urgencies</option>
                  <option value="immediate">Immediate</option>
                  <option value="medium">Medium</option>
                  <option value="not urgent">Not Urgent</option>
                </select>
              </div>
            </div>

            {pendingTasks.length ? (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleCompletion}
                />
              ))
            ) : (
              <p className="h5 text-muted">No pending tasks!!</p>
            )}
          </section>

          {/* Completed */}
          <section>
            <h2 className="h4 fw-semibold mb-3">Completed Tasks</h2>
            {completedTasks.length ? (
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleCompletion}
                  disabledToggle
                />
              ))
            ) : (
              <p className="h5 text-muted">No completed tasks yet.</p>
            )}
          </section>
        </div>

        {/* ---------- RIGHT: Stats card ---------- */}
        <aside className="col-12 col-md-4 pt-md-5">
          <div className="card p-4">
            <div className="d-flex justify-content-between text-center mb-4">
              <div>
                <p className="mb-1 fw-bold fs-6">Pending</p>
                <p className="fs-3 fw-bold text-danger mb-0">
                  {pendingTasksAll.length}
                </p>
              </div>
              <div>
                <p className="mb-1 fw-bold fs-6">Completed</p>
                <p className="fs-3 fw-bold text-success mb-0">
                  {completedTasks.length}
                </p>
              </div>
            </div>

            {/* progress bar */}
            <p className="fw-bold text-center mb-1">
              Progress: {completedTasks.length}/{tasks.length}
            </p>
            <div className="progress" style={{ height: 20 }}>
              <div
                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{
                  width: `${(completedTasks.length / tasks.length) * 100 || 0}%`,
                }}
                aria-valuenow={completedTasks.length}
                aria-valuemin="0"
                aria-valuemax={tasks.length}
              >
                {Math.round(
                  ((completedTasks.length || 0) / (tasks.length || 1)) * 100
                )}
                %
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
