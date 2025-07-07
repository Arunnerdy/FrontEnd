import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateTask() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    urgency: "immediate",
    assigneeName: "",
    assigneeEmail: "",
    projectId: "", // ✅ Project ID will be set via dropdown
  });

  // ✅ Fetch user's projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/projects/my-projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/tasks", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Task created successfully and credentials sent!");
      navigate("/dashboard/project-manager");
    } catch (error) {
      console.error("❌ Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  return (
    <div className="container py-5 border border-2 border-dark rounded" style={{ maxWidth: "640px" }}>
      <h1 className="mb-4 text-center">Create New Task</h1>

      <form onSubmit={handleSubmit}>
        {/* Task Name */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">Task Name</label>
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
          <label htmlFor="description" className="form-label fw-semibold">Task Description</label>
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
          <label htmlFor="dueDate" className="form-label fw-semibold">Due Date</label>
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
          <label htmlFor="urgency" className="form-label fw-semibold">Urgency</label>
          <select
            id="urgency"
            name="urgency"
            className="form-select"
            value={form.urgency}
            onChange={handleChange}
          >
            <option value="immediate">Immediate</option>
            <option value="medium">Medium</option>
            <option value="not urgent">Not Urgent</option>
          </select>
        </div>

        {/* Project Selection */}
        <div className="mb-3">
          <label htmlFor="projectId" className="form-label fw-semibold">Assign to Project</label>
          <select
            id="projectId"
            name="projectId"
            className="form-select"
            value={form.projectId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assignee Name */}
        <div className="mb-3">
          <label htmlFor="assigneeName" className="form-label fw-semibold">Assignee Name</label>
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
          <label htmlFor="assigneeEmail" className="form-label fw-semibold">Assignee Email</label>
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
          <button type="submit" className="btn btn-dark btn-lg text-white">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
