/* ===========================================
   TeamMemberDashboard.jsx  —  Polling edition
   Polls /api/projects/{id}/my-tasks every 10 s
   =========================================== */

import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import { FaFilter, FaArrowLeft } from "react-icons/fa";

/* ---------- polling hook ---------- */
function usePollingTasks(projectId, interval = 10000, auth) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!projectId) return;                   // nothing selected → skip

    let cancel = false;

    async function fetchOnce() {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/projects/${projectId}/my-tasks`,
          auth
        );
        if (!cancel) setTasks(data);
      } catch (err) {
        console.error("Task polling error:", err);
      }
    }

    fetchOnce();                              // immediate first load
    const id = setInterval(fetchOnce, interval);

    return () => {
      cancel = true;                          // stop setState after unmount
      clearInterval(id);                      // clear timer
    };
  }, [projectId, interval]);

  return [tasks, setTasks];
}

/* ---------- main component ---------- */
export default function TeamMemberDashboard() {
  const [username, setUsername] = useState("Username");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const token = localStorage.getItem("token");
  const auth  = { headers: { Authorization: `Bearer ${token}` } };

  /* projects once */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/projects/assigned-projects",
          auth
        );
        setProjects(data);
      } catch (err) {
        console.error("Projects error:", err);
      }
    })();
  }, []);

  /* username once */
  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/users/me", auth
        );
        setUsername(data.name);
      } catch (err) {
        console.error("User error:", err);
      }
    })();
  }, []);

  /* ------- POLLING ------- */
  const [tasks, setTasks] = usePollingTasks(
    selectedProject?.id,
    10000,      // 10‑second interval
    auth
  );

  /* helper lists */
  const pendingTasksAll = tasks.filter(t => !t.completed);
  const completedTasks  = tasks.filter(t =>  t.completed);
  const pendingTasks    =
    urgencyFilter === "all"
      ? pendingTasksAll
      : pendingTasksAll.filter(t => t.urgency === urgencyFilter);

  /* toggle */
  const handleToggleCompletion = async (taskId) => {
    const original = tasks.find(t => t.id === taskId);
    if (!original) return;

    // optimistic UI
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t,
              completed: !t.completed,
              status: !t.completed ? "Done" : "In Progress" }
          : t
      )
    );

    try {
      const { data: serverTask } = await axios.put(
        `http://localhost:8080/api/tasks/${taskId}/completed`,
        { completed: !original.completed },
        auth
      );

      const merged = {
        ...serverTask,
        status: serverTask.completed ? "Done" : "In Progress",
      };
      setTasks(prev => prev.map(t => (t.id === taskId ? merged : t)));
    } catch (err) {
      console.error("Toggle failed; rollback:", err);
      setTasks(prev => prev.map(t => (t.id === taskId ? original : t)));
      alert("Could not update task – please try again.");
    }
  };

  /* --------- UI: choose project --------- */
  if (!selectedProject) {
    return (
      <div className="container py-4 mt-5">
        <h1 className="display-5 fw-bold mb-4">
          {username} <span className="fw-light">— Your Projects</span>
        </h1>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {projects.map(p => (
            <div className="col" key={p.id}>
              <button
                onClick={() => setSelectedProject(p)}
                className="card h-100 w-100 p-5 text-center border border-dark fw-bold shadow-sm"
                style={{ minHeight: 180, fontSize: "1.3rem" }}
              >
                {p.name}
              </button>
            </div>
          ))}
        </div>

        {!projects.length && (
          <p className="mt-5 text-muted">No projects assigned.</p>
        )}
      </div>
    );
  }

  /* --------- UI: tasks dashboard --------- */
  return (
    <div className="container py-4">
      <button className="btn btn-link mb-3" onClick={() => setSelectedProject(null)}>
        <FaArrowLeft className="me-2" /> Back to Projects
      </button>

      <h1 className="display-6 fw-bold mb-4">
        {selectedProject.name} <span className="fw-light">Tasks</span>
      </h1>

      <div className="row g-4">
        {/* list column */}
        <div className="col-md-8">
          {/* Pending */}
          <section className="mb-5">
            <div className="d-flex align-items-center mb-3">
              <h2 className="h4 mb-0">Pending Tasks</h2>
              <div className="ms-auto d-flex gap-2">
                <FaFilter className="text-muted" />
                <select
                  className="form-select form-select-sm w-auto"
                  value={urgencyFilter}
                  onChange={e => setUrgencyFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="immediate">Immediate</option>
                  <option value="medium">Medium</option>
                  <option value="not urgent">Not Urgent</option>
                </select>
              </div>
            </div>

            {pendingTasks.length ? (
              pendingTasks.map(t => (
                <TaskCard key={t.id} task={t} onToggle={handleToggleCompletion} />
              ))
            ) : (
              <p className="text-muted">No pending tasks.</p>
            )}
          </section>

          {/* Completed */}
          <section>
            <h2 className="h4 mb-3">Completed Tasks</h2>
            {completedTasks.length ? (
              completedTasks.map(t => (
                <TaskCard key={t.id} task={t} onToggle={handleToggleCompletion} />
              ))
            ) : (
              <p className="text-muted">No completed tasks yet.</p>
            )}
          </section>
        </div>

        {/* sidebar */}
        <aside className="col-md-4 pt-md-5">
          <div className="card p-4">
            <div className="d-flex justify-content-between text-center mb-4">
              <div>
                <p className="mb-1">Pending</p>
                <p className="fs-3 text-danger mb-0">{pendingTasksAll.length}</p>
              </div>
              <div>
                <p className="mb-1">Completed</p>
                <p className="fs-3 text-success mb-0">{completedTasks.length}</p>
              </div>
            </div>

            <p className="fw-bold text-center mb-1">
              Progress: {completedTasks.length}/{tasks.length}
            </p>
            <div className="progress" style={{ height: 20 }}>
              <div
                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                style={{
                  width: `${(completedTasks.length / (tasks.length || 1)) * 100}%`,
                }}
              >
                {Math.round(
                  (completedTasks.length / (tasks.length || 1)) * 100
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
