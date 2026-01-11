import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewOrganization.css";
import Admin from "./Admin";

function ViewOrganization() {
  const [members, setMember] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "ADMIN") {
        navigate("/admin");
      } else if (sessionStorage.getItem("userRole") === "ORGANIZATION") {
        navigate("/organization");
      }
    }, [navigate]);


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/admin/getAllOrganizations",
          config
        );
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching organization:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editorganization/${id}`);
    }
  };

  return (
    <Admin>
      <div className="view-org-container">
        <h2 className="heading">Organization</h2>
        <table className="org-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.description}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(member.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Members available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewOrganization;
