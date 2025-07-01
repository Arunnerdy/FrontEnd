import React, { useEffect, useState, useMemo } from "react";
import TaskCard from "./TaskCard"; 
import { FaFilter, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TeamMemberDashboard() {
  const [username, setUsername] = useState("Username");
  const [tasks, setTasks] = useState([]);

  // -------------------------------------------------------------------------
  // TODO 1: FETCH the logged‑in user's profile (username etc.)
  //   Example:   GET /api/auth/me  ➜ { "name": "Arun" }
  // TODO 2: FETCH the tasks list for that user
  //   Example:   GET /api/users/:userId/tasks
  // -------------------------------------------------------------------------
  useEffect(() => {
    // Mock user fetch
    setUsername("Arun");

    // Mock tasks fetch
    setTasks([
      {
        id: 1,
        title: "Task One",
        description: "This is the first task",
        urgency: "immediate",
        dueDate: "2025-04-20",
        completed: false,
      },
      {
        id: 2,
        title: "Task Two",
        description: "This is the second task",
        urgency: "medium",
        dueDate: "2025-04-30",
        completed: false,
      },
      {
        id: 3,
        title: "Task Three",
        description: "This is the third task",
        urgency: "not urgent",
        dueDate: "2025-05-05",
        completed: true,
      },
      {
        id: 5,
        title: "Task Five",
        description: "This is the fifth task",
        urgency: "immediate",
        dueDate: "2025-04-22",
        completed: false,
      },
    ]);
  }, []);

  // Handler for marking a task complete/incomplete
  const handleToggleCompletion = async (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );

    // ---------------------------------------------------------------------
    // TODO: PATCH /api/tasks/:taskId/toggle
    // ---------------------------------------------------------------------
  };

  // Memoised derived values
  const { pendingTasks, completedTasks } = useMemo(() => {
    const pending = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);
    return { pendingTasks: pending, completedTasks: completed };
  }, [tasks]);

  const handleSignOut = () => {
    // TODO: call your auth‑logout logic here (clear token, API, etc.)
    // Then navigate to sign‑in page:
    // navigate("/signin");
  };

  const [urgencyFilter, setUrgencyFilter] = useState("all");

/** replace this with a real fetch */
const fetchTasks = (filter) => {
  // TODO: e.g. GET /api/users/:id/tasks?urgency=${filter}
  //       Replace below with response.json()
  const sample = [
    /* …same mocked array… */
  ];
  return filter === "all" ? sample : sample.filter(t => t.urgency === filter);
};

  return (
    <div className="container py-4">
      {/* Header */}
      <h1 className="display-5 fw-bold mb-4">
        {username} <span className="fw-light">Welcome!!</span>
      </h1>

     <div className="position-absolute top-0 end-0 p-3">
  <div className="dropdown">
    <button
      className="btn btn-outline-secondary border-0 fs-2"
      id="userMenu"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <FaUserCircle />
    </button>

    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
      <li>
        <button
          className="dropdown-item d-flex align-items-center"
          onClick={handleSignOut}
        >
          <FaSignOutAlt className="me-2" />
          Sign&nbsp;out
        </button>
      </li>
    </ul>
  </div>
</div>

      <div className="row g-4">
        {/* Left – task lists */}
        <div className="col-12 col-md-8">
            
          {/* Pending section */}
          <section className="mb-5">
            <h2 className="h4 fw-semibold mb-3">Pending Tasks</h2>
          <span>
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
            </span>  
            {pendingTasks.length ? (
              pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={handleToggleCompletion} />
              ))
            ) : (
              <p className="h4 fw-semibold mb-5" >No pending tasks!!</p>
            )}
          </section>

          {/* Completed section */}
          <section>
            <h2 className="h4 fw-semibold mb-3">Completed Tasks</h2>
            {completedTasks.length ? (
              completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={handleToggleCompletion} disabledToggle={true} />
              ))
            ) : (
              <p className="h4 fw-semibold mb-5">No completed tasks yet!!</p>
            )}
          </section>
        </div>

        {/* Right – stats */}
        <aside className="col-12 col-md-4 pt-md-5">
  <div className="card p-4">
    <div className="d-flex justify-content-between text-center mb-4">
      <div>
        <p className="mb-1 fw-bold fs-6">Pending Tasks</p>
        <p className="fs-3 fw-bold text-danger mb-0">{pendingTasks.length}</p>
      </div>
      <div>
        <p className="mb-1 fw-bold fs-6">Completed Tasks</p>
        <p className="fs-3 fw-bold text-success mb-0">{completedTasks.length}</p>
      </div>
    </div>

    {/* Progress Bar Section */}
    <div>
      <p className="fw-bold text-center mb-1">
        Progress: {completedTasks.length} / {tasks.length} tasks completed
      </p>
      <div className="progress" style={{ height: '20px' }}>
        <div
          className="progress-bar bg-success progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: `${(completedTasks.length / tasks.length) * 100 || 0}%` }}
          aria-valuenow={completedTasks.length}
          aria-valuemin="0"
          aria-valuemax={tasks.length}
        >
          {Math.round((completedTasks.length / tasks.length) * 100) || 0}%
        </div>
      </div>
    </div>
  </div>
</aside>

      </div>
    </div>
  );
}