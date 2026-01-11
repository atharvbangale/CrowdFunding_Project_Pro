import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import "./EditOrganization.css";

function EditOrganization() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState({
    name: "",
    email: "",
    description: "",
    password: "", // will retain original password internally
  });

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
    const fetchOrg = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const res = await axios.get(`http://localhost:8080/admin/getOrganizationById/${id}`, config);
        setOrganization({
          name: res.data.name,
          email: res.data.email,
          description: res.data.description,
          password: res.data.password || "", // capture old password to retain
        });
      } catch (err) {
        console.error("Failed to fetch organization:", err);
      }
    };
    fetchOrg();
  }, [id]);

  const handleChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   try {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  await axios.put(`http://localhost:8080/admin/updateOrganization/${id}`, organization, config);

  toast.success("Organization updated successfully!", {
    autoClose: 2000, // Close after 2 seconds
    onClose: () => navigate("/admin/viewallorganizations"),
  });

} catch (err) {
  console.error("Error updating organization:", err);
  toast.error("Failed to update organization.");
}
  };

  return (
    <Admin>
            <ToastContainer />
      <div className="edit-org-container">
        <h2 className="text-success text-center mb-4">Edit Organization</h2>
        <form onSubmit={handleSubmit} className="edit-org-form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={organization.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={organization.email}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={organization.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          {/* Password is retained but not shown */}

          <button type="submit" className="btn btn-success mt-3 w-100">
            Update
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default EditOrganization;
