import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const dummyUserData = {
  name: "Manoj C",
  email: "manoj@example.com",
  phone: "9876543210",
  DOB: "01-01-2000",
};

export default function EditUserInfo() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    DOB: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data fetching from a JS object
    setUser(dummyUserData);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated User Info:", user);
    setShowSuccessModal(true);
  };

  const handleClose = () => setShowSuccessModal(false);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Edit User Info</h3>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input type="text" className="form-control" value={user.name} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input type="email" className="form-control" value={user.email} readOnly />
        </div>
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
        <div className="mb-4">
          <label className="form-label fw-semibold">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={user.DOB}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-lg btn-black-white">
            Update
          </button>
          <br />
          <button type="button" className="btn btn-dark btn-lg btn-black-white" onClick={() => navigate("/")}>
            Cancel
          </button>
          <br />
        </div>
      </form>

      {/* ✅ Success Modal */}
      <Modal show={showSuccessModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>✅ Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>User information updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
