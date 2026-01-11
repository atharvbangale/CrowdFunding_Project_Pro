import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { FaUserAlt, FaClipboardList } from "react-icons/fa";

function CustomerNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleLogoutClick = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3 shadow-sm"
      style={{
        maxHeight: "12vh",
        backgroundColor: "#ffffff",
        borderBottom: "3px solid #4CAF50", // green line for accent
      }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="../assests/logo1.png"
            alt="Digital Grampanchayat Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="btn"
                style={{
                  color: "#4CAF50",
                  fontWeight: "bold",
                  border: "2px solid #4CAF50",
                  backgroundColor: "white",
                  marginTop: "8%",
                  transition: "all 0.3s ease",
                }}
              >
                <FaUserAlt size={25} style={{ marginRight: "8px" }} />
                {userId ? "Profile" : "Sign In"}
              </button>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid #4CAF50",
                    borderRadius: "5px",
                    zIndex: 1000,
                    minWidth: "160px",
                  }}
                >
                  {userId ? (
                    <>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate(`/editprofile/${userId}`)}
                      >
                        Profile
                      </button>
                      <button className="dropdown-item" onClick={handleLogoutClick}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="dropdown-item" onClick={handleLoginClick}>
                        Login
                      </button>
                      <button className="dropdown-item" onClick={handleRegisterClick}>
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>

            <li className="nav-item ms-3">
              <NavLink className="nav-link fs-5 fw-semibold" to="/yourfunds">
                <button
                  type="button"
                  className="btn"
                  style={{
                    color: "#4CAF50",
                    fontWeight: "bold",
                    border: "2px solid #4CAF50",
                    backgroundColor: "white",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaClipboardList size={25} style={{ marginRight: "8px" }} />
                  Fundings
                </button>
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
