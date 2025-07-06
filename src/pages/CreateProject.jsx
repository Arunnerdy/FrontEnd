import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal, Button } from "react-bootstrap";  

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planning",
    manager: "",
    managerEmail: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.manager ||
      !formData.managerEmail
    ) {
      setError("Please fill in all required fields")
      return
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError("End date must be after start date")
      return
    }

    try {
      setError("")
      setLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock API call - in real app, this would call the backend
      console.log("Creating project:", formData)

      setShowSuccessModal(true)

      // Reset form
      setFormData({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "Planning",
        manager: "",
        managerEmail: "",
      })
      
    } catch (error) {
      setError("Failed to create project")
    }
    setLoading(false)
  }

  const handleModalClose = () => {
    setShowSuccessModal(false);

  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-4">Create New Project</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Project Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      End Date *
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="manager" className="form-label">
                      Project Manager *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="manager"
                      name="manager"
                      value={formData.manager}
                      onChange={handleChange}
                      placeholder="Enter project manager name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="managerEmail" className="form-label">
                      Manager Email *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="managerEmail"
                      name="managerEmail"
                      value={formData.managerEmail}
                      onChange={handleChange}
                      placeholder="Enter manager email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark btn-black-white" disabled={loading}>
                  {loading ? "Creating..." : "Create Project"}
                </button>
                <button type="button" className="btn btn-secondary btn-black-white" onClick={() => navigate("/projects")}>
                  Cancel
                </button>
              </div>  
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>✅ Project Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your project has been created successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateProject
