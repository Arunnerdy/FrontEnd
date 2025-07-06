import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";  

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    urgency: "immediate",
    assigneeName: "",
    assigneeEmail: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: POST /api/tasks with form payload
    // await fetch("/api/tasks", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    // TODO: navigate away or show toast
    // navigate("/dashboard/project‑manager");
    console.log("Task to create:", form);
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);

    // Reset form
    setForm({
      title: "",
      description: "",
      dueDate: "",
      urgency: "immediate",
      assigneeName: "",
      assigneeEmail: "",
    });
  };

  return (
    <div
    className="container py-5 border border-2 border-dark rounded"
    style={{ maxWidth: "640px" }}
    >
      <h1 className="mb-4 text-center">Create New Task</h1>

      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Task Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Task Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Task Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Due Date */}
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label fw-semibold">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="form-control"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Urgency */}
        <div className="mb-3">
          <label htmlFor="urgency" className="form-label fw-semibold">
            Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            className="form-select"
            value={form.urgency}
            onChange={handleChange}
          >
            <option value="immediate">Immediate</option>
            <option value="medium">Medium</option>
            <option value="not urgent">Not Urgent</option>
          </select>
        </div>

        {/* Assignee Name */}
        <div className="mb-3">
          <label htmlFor="assigneeName" className="form-label fw-semibold">
            Assignee Name
          </label>
          <input
            type="text"
            id="assigneeName"
            name="assigneeName"
            className="form-control"
            value={form.assigneeName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Assignee Email */}
        <div className="mb-4">
          <label htmlFor="assigneeEmail" className="form-label fw-semibold">
            Assignee Email
          </label>
          <input
            type="email"
            id="assigneeEmail"
            name="assigneeEmail"
            className="form-control"
            value={form.assigneeEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <div className="d-grid">
          <button type="submit" className="btn btn-dark btn-lg btn-black-white">
            Create Task
          </button>
          <br />
          <button type="button" className="btn btn-dark btn-lg btn-black-white" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>

        {/* Success Modal */}
        <Modal show={showSuccessModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>🎉 Task Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task has been created successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>
  );
}

