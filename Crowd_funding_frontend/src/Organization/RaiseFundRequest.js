import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./RaiseFundRequest.css";
import Organization from "./Organization";

function RaiseFundRequest() {
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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    maxAmount: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("jwtToken");
    const Id = sessionStorage.getItem("userId");

    if (!token || !Id) {
      toast.error("Unauthorized. Please log in again.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/organization/createFund/${Id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Fund request raised successfully!", {
        autoClose: 2000,
        position: "top-right",
      });

      // Refresh the page after the toast disappears
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Match this with autoClose duration

      setFormData({
        title: "",
        description: "",
        maxAmount: "",
        endDate: "",
      });

      // Optional: redirect after delay
      // setTimeout(() => navigate("/organization/view-funds"), 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error("Failed to raise fund: " + error.response.data);
      } else {
        toast.error("Error while raising fund.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <Organization>
      <ToastContainer />
      <Card className="p-4 shadow-lg fund-card mx-auto mt-5">
        <h3 className="text-center text-success mb-4">Raise Fund Request</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label className="text-success">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label className="text-success">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="maxAmount" className="mb-3">
            <Form.Label className="text-success">Maximum Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter maximum amount"
              name="maxAmount"
              value={formData.maxAmount}
              onChange={handleChange}
              required
              min={1}
            />
          </Form.Group>

          <Form.Group controlId="endDate" className="mb-4">
            <Form.Label className="text-success">End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit" className="px-4">
              Submit Request
            </Button>
          </div>
        </Form>
      </Card>
    </Organization>
  );
}

export default RaiseFundRequest;
