// EditUserInfo.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function EditUserInfo() {
  /* ---------- STATE ---------- */
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "9876543210", // dummy phone
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  /* ---------- load name + email ---------- */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:8080/api/users/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser((u) => ({ ...u, name: data.name, email: data.email }));
      } catch (err) {
        console.error("Could not fetch user data:", err);
      }
    })();
  }, []);

  /* ---------- input handlers ---------- */
  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  /* ---------- submit password ---------- */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8080/api/users/me/password",
        { password: user.password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser((u) => ({ ...u, password: "" }));
      setShowSuccess(true);
    } catch (err) {
      console.error("Password update failed:", err);
      alert("Could not update password – please try again.");
    }
  };

  /* ---------- role‑based redirect ---------- */
  const goToDashboard = () => {
    const role = localStorage.getItem("role"); 
    console.log(role);// e.g. "ADMIN", "PROJECT_MANAGER", "TEAM_MEMBER"
    switch (role) {
      case "ROLE_ADMIN":
        navigate("/projects");
        break;
      case "ROLE_PROJECT_MANAGER":
        navigate("/project-manager-dashboard");
        break;
      case "ROLE_TEAM_MEMBER":
        navigate("/team-member-dashboard");
        break;
      //default:
      //navigate("/"); // fallback
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Edit User Info</h3>

      <form onSubmit={handleUpdate}>
        {/* Name (read‑only) */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input className="form-control" value={user.name} readOnly />
        </div>

        {/* Email (read‑only) */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input className="form-control" value={user.email} readOnly />
        </div>

        {/* Phone (dummy editable) */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={user.phone}
            onChange={handleChange}
          />
        </div>

        {/* New password */}
        <div className="mb-4">
          <label className="form-label fw-semibold">New Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-lg btn-black-white">
            Update
          </button>
          <br />
          <button
            type="button"
            className="btn btn-dark btn-lg btn-black-white"
            onClick={goToDashboard}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* success modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>✅ Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
