/* =========================================
   TaskCard.jsx — upgraded visual + toggle
   ========================================= */
import React from "react";

/* Map urgency → Bootstrap badge classes */
const urgencyClasses = {
  immediate: "badge bg-danger",
  medium: "badge bg-warning text-dark",
  "not urgent": "badge bg-success",
};

export default function TaskCard({
  task,
  onToggle,
  disabledToggle = false, // same prop as before
}) {
  const { id, title, description, urgency, dueDate, completed } = task;

  return (
    <div className={`card mb-3 shadow-sm ${completed ? "bg-light" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-start gap-3">
        {/* ---------- Left block: content ---------- */}
        <div className="flex-grow-1">
          <h5 className="card-title mb-1 fw-semibold">{title}</h5>

          {description && (
            <p className="card-text small text-muted mb-2">{description}</p>
          )}

          {dueDate && (
            <small className="text-muted">
              Due:{" "}
              {new Date(dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </small>
          )}
        </div>

        {/* ---------- Right block: urgency + toggle ---------- */}
        <div className="d-flex flex-column align-items-end gap-2">
          {/* urgency pill */}
          {urgency && (
            <span
              className={
                urgencyClasses[urgency.toLowerCase()] || "badge bg-secondary"
              }
            >
              {urgency === "not urgent"
                ? "Not Urgent"
                : urgency.charAt(0).toUpperCase() + urgency.slice(1)}
            </span>
          )}

          {/* toggle switch or static badge when disabled */}
          {disabledToggle ? (
            <span
              className={`badge ${completed ? "bg-secondary" : "bg-success"}`}
            >
              {completed ? "Done" : "Pending"}
            </span>
          ) : (
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={completed}
                onChange={() => onToggle(id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
