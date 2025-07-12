/* ---------------------------------------------------------------
 *  Navbar.jsx  — shows dynamic user name & role‑based navigation
 * ------------------------------------------------------------- */

import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  FaUserCircle,
  FaUserTie,
  FaUsers,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";
import { MdEngineering } from "react-icons/md";
import NotificationBell from "../pages/NotificationBell";
import useCurrentUser from "../hooks/useCurrentUser";   // ← small hook

const Navbar = () => {
  const navigate = useNavigate();
  const { name, role } = useCurrentUser();              // {name, role}

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg1-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Project Manager App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* -------- Left‑side role‑based links -------- */}
          <ul className="navbar-nav me-auto">
            {role === "ROLE_PROJECT_MANAGER" && (
              <li className="nav-item">
                <Link className="nav-link txt_color myhover" to="/">
                  <MdEngineering size={24} className="me-2" />
                  Project Manager
                </Link>
              </li>
            )}

            {role === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link txt_color myhover" to="/projects">
                  <FaUserTie size={22} className="me-2" />
                  Admin
                </Link>
              </li>
            )}

            {role === "ROLE_TEAM_MEMBER" && (
              <li className="nav-item">
                <Link
                  className="nav-link txt_color myhover"
                  to="/team-member-dashboard"
                >
                  <FaUsers size={24} className="me-2" />
                  Team Member
                </Link>
              </li>
            )}
          </ul>

          {/* -------- Right‑side bell + user dropdown -------- */}
          <div className="d-flex align-items-center gap-3">
            <NotificationBell />

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="secondary"
                className="txt_color myhover bg-transparent border-0"
              >
                <FaUserCircle size={22} className="me-2" />
                {name || "Loading…"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/edit-user-info"
                  className="btn-black-white1"
                >
                  <FaEdit className="me-2" />
                  Edit User Info
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="btn-black-white1">
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
