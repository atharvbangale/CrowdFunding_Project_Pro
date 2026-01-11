import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddOrganization.css";
import Admin from "./Admin";

const AddOrganization = () => {
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

  const initialValues = {
    name: "",
    description: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/admin/registerOrganization",
        values,
        config
      );

      if (response.status === 201) {
        alert("Organization added successfully!");
        resetForm();
        window.location.reload();
      } else {
        alert("Failed to add member.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Admin>
      <div className="add-product-container">
        <h3>Add New Organization</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="product-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" placeholder="Enter name" />
                <ErrorMessage name="name" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                  rows="3"
                />
                <ErrorMessage name="description" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="Enter email" />
                <ErrorMessage name="email" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder="Enter password" />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                style={{ backgroundColor: "#2e7d32", color: "white" }}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Admin>
  );
};

export default AddOrganization;
