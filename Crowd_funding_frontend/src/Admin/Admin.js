import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaClipboardList, FaListAlt, FaFileAlt } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <AdminNavbar />
      <div className="layout-container" style={{ display: "flex" }}>
        <div
          className="sidebar"
          style={{
            backgroundColor: "#4CAF50", // dark green
            color: "white",
            width: "12%",
            padding: "1%",
            minHeight: "100vh",
          }}
        >
          <div className="sidebar-header">
            <h3 style={{ color: "white", borderBottom: "2px solid #ffffff", paddingBottom: "10px" }}>Admin Panel</h3>
          </div>
          <nav className="sidebar-nav" style={{ marginTop: "20px" }}>
            <NavLink
              to="/admin/addorganization"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
            >
              <FaUserPlus className="icon" /> Add Organization
            </NavLink>
            <NavLink
              to="/admin/viewallorganizations"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
            >
              <FaUsers className="icon" /> View Organizations
            </NavLink>
           
            <NavLink
              to="/admin/viewallfundings"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
            >
              <FaFileAlt className="icon" /> View Fundings
            </NavLink>
          </nav>
        </div>

        <div className="main-content" style={{ flex: 1, backgroundColor: "#f5fff7", padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Admin;
