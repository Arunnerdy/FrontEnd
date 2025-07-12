/* =====================================================
   Dashboard.jsx  –  Polled every 10 s for fresh data
   ===================================================== */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* ---------- reusable polling hook ---------- */
function usePolling(url, interval = 10000) {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const auth  = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!url) return;                       // guard

    let cancel = false;

    async function fetchOnce() {
      try {
        const res = await axios.get(url, auth);
        if (!cancel) setData(res.data);
      } catch (err) {
        console.error(`Polling error for ${url}:`, err);
      }
    }

    fetchOnce();                            // initial load
    const id = setInterval(fetchOnce, interval);

    return () => {
      cancel = true;
      clearInterval(id);                    // cleanup
    };
  }, [url, interval]);

  return data;
}

/* ---------- main Dashboard ---------- */
export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  /* poll endpoints */
  const projects = usePolling(
    "http://localhost:8080/api/projects/my-projects",
    10000
  );
  const tasks = usePolling(
    "http://localhost:8080/api/my-tasks",
    10000
  );

  /* stop spinner when first data arrives */
  useEffect(() => {
    if (projects || tasks) setLoading(false);
  }, [projects, tasks]);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome back!</h1>
        <Link to="/create-task" className="btn btn-primary">
          Create New Task
        </Link>
      </div>

      <div className="row">
        {/* ---- My Projects card ---- */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>My Projects</h5>
            </div>
            <div className="card-body">
              {projects.length === 0 ? (
                <p>
                  No projects found.{" "}
                  <Link to="/projects/create">Create your first project</Link>
                </p>
              ) : (
                <div className="list-group list-group-flush">
                  {projects.map((p) => (
                    <Link
                      key={p.id}
                      to={`/projects/${p.id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{p.name}</h6>
                        <small className="text-muted">Due: {p.endDate}</small>
                      </div>
                      <p className="mb-1">Status: {p.status}</p>
                      <small>{p.tasks?.length || 0} tasks</small>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---- My Tasks & stats ---- */}
        <div className="col-md-4">
          {/* tasks */}
          <div className="card">
            <div className="card-header">
              <h5>My Tasks</h5>
            </div>
            <div className="card-body">
              {tasks.length === 0 ? (
                <p>No tasks assigned to you.</p>
              ) : (
                <div className="list-group list-group-flush">
                  {tasks.map((t) => (
                    <div key={t.id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{t.title}</h6>
                        <small
                          className={`priority-${(
                            t.priority ||
                            t.urgency ||
                            ""
                          ).toLowerCase()}`}
                        >
                          {(t.priority || t.urgency || "").toUpperCase()}
                        </small>
                      </div>
                      <p className="mb-1">{t.project?.name || "No Project"}</p>
                      <small>
                        Due: {t.dueDate} | Status: {t.status || "To Do"}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* stats */}
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
  );
}
