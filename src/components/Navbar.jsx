import { Link, useNavigate } from "react-router-dom"
import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg1-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Project Manager
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
           
            <>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link txt_color myhover" to="/">
                    Project Manager-Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link txt_color myhover" to="/projects">
                    Admin-Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link txt_color myhover" to="/team-member-dashboard">
                    Team-Member-Dashboard
                  </Link>
                </li>
              </ul>

              <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" className="txt_color myhover bg-transparent border-0">
                Manoj C
              </Dropdown.Toggle>

              <Dropdown.Menu>
                
                <Dropdown.Item as={Link} to="/edit-user-info" className="btn-black-white1">
                  Edit User Info
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="btn-black-white1">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
