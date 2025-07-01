import React from "react";

const urgencyClasses = {
  immediate: "badge bg-danger",
  medium: "badge bg-warning text-dark",
  "not urgent": "badge bg-success",
};

export default function TaskCard({ task, onToggle }) {
  const { id, title, description, urgency, dueDate, completed } = task;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-start gap-3">
        {/* Left block – task content */}
        <div className="flex-grow-1">
          <h5 className="card-title mb-1 fw-semibold">{title}</h5>
          {description && (
            <p className="card-text small text-muted mb-2">{description}</p>
          )}
          <small className="text-muted">
            Due date: {new Date(dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </small>
        </div>

        {/* Right block – urgency pill + toggle */}
        <div className="d-flex flex-column align-items-end gap-2">
          {urgency && (
            <span className={`${urgencyClasses[urgency.toLowerCase()]}`.trim()}>
              {urgency === "not urgent"
                ? "Not Urgent"
                : urgency.charAt(0).toUpperCase() + urgency.slice(1)}
            </span>
          )}

          {/* Toggle => calls parent handler */}
          <div className="form-check form-switch m-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={completed}
              onChange={() => onToggle(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
