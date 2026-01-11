import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("userName");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <Navbar
        variant="dark"
        expand="lg"
        className="px-5"
        style={{ backgroundColor: "#4CAF50", borderBottom: "3px solid white" }}
      >
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/admin/addagent" className="d-flex align-items-center">
            <img
              src="../assests/logo1.png"
              alt="Logo"
              style={{ width: "120px", height: "auto" }}
              className="me-2"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Badge bg="light" className="fs-5 text-dark fw-semibold me-3">
                <FaUserCircle className="me-1" /> {username}
              </Badge>
              <Button
                variant="light"
                className="text-success fw-semibold"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-1" /> Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </div>
  );
}

export default AdminNavbar;
