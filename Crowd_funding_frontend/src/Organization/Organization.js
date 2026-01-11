import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaFileAlt,
} from "react-icons/fa";
import OrganizationNavbar from "./OrganizationNavbar";
import "./Styles.css";

function Organization({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <OrganizationNavbar />
      <div className="layout-container" style={{ display: "flex" }}>
        <div
          className="sidebar"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            width: "12%",
            padding: "1%",
            minHeight: "100vh",
          }}
        >
          <div className="sidebar-header">
            <h3
              style={{
                color: "white",
                borderBottom: "2px solid #ffffff",
                paddingBottom: "10px",
              }}
            >
              Organization Panel
            </h3>
          </div>
          <nav className="sidebar-nav" style={{ marginTop: "20px" }}>
            <NavLink
              to="/organization/raisefund"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
            >
              <FaUserPlus className="icon" /> Raise Fund
            </NavLink>

            <NavLink
              to="/organization/viewfundraised"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
            >
              <FaFileAlt className="icon" /> View Funds
            </NavLink>
          </nav>
        </div>

        <div
          className="main-content"
          style={{ flex: 1, backgroundColor: "#f5fff7", padding: "20px" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Organization;
