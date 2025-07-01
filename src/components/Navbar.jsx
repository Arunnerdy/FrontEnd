import { Link, useNavigate } from "react-router-dom"

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
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle txt_color myhover" href="#" role="button" data-bs-toggle="dropdown">
                    Manoj C
                  </a>
                  <ul className="dropdown-menu">
                    
                    
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
