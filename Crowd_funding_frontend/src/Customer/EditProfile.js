import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function EditProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const id = userId;

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

  // State variables
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");

  const editUrl = `http://localhost:8080/customer/getUserById/${id}`;
  const updateUrl = `http://localhost:8080/customer/updateUser/${id}`;

  // Fetch existing user details
  useEffect(() => {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  axios
    .get(editUrl, config)
    .then((response) => {
      const { userName, contact, email, address, pincode } = response.data;
      setName(userName || "");
      setMobile(contact || "");
      setEmail(email || "");
      setAddress(address || "");
      setPincode(pincode || "");
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    });
}, [editUrl]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

  const userDetails = {
  userName: name,
  contact: mobile,
  email,
  address,
  pincode,
  password: password || null, // only if updated
};


    axios
      .put(updateUrl, userDetails, config)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="container1">
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "2%" }}>
        <div
          className="shadow p-4"
          style={{
            width: "40rem",
            borderRadius: "12px",
            border: "2px solid #28a745",
            backgroundColor: "#ffffff",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#28a745" }}>
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Full Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                required
              />
            </div>

            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
                style={{ backgroundColor: "#e9ecef" }}
              />
            </div>

            <div className="mb-3">
              <label>Address:</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="2"
                required
              />
            </div>

            <div className="mb-3">
              <label>Pincode:</label>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                pattern="\d{6}"
                maxLength={6}
                required
              />
            </div>

            <div className="mb-3">
              <label>New Password (optional):</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#28a745", color: "#fff", fontWeight: "bold" }}
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
