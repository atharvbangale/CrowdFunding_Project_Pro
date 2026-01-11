import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
initialValues: {
  userName: "",   
  contact: "",    
  email: "",
  pincode: "",
  address: "",
  password: "",
},

    validationSchema: Yup.object({
      userName: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),
      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/customer/registerUser", values)
        .then(() => {
          toast.success("Registration successful!");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Error registering user. Please try again.");
        });
    },
  });

  return (
    <div
      style={{ backgroundColor: "white", color: "black", minHeight: "90vh" }}
    >
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="shadow-lg p-4 rounded"
          style={{ width: "35rem", backgroundColor: "white" ,  border: "3px solid #4CAF50"}}
        >
          <h2 className="text-center mb-2 text-success">
            Register with FunLin
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("userName")}
                className="form-control"
              />
              {formik.touched.userName && formik.errors.userName && (
                <div className="text-danger">{formik.errors.userName}</div>
              )}
            </div>

            {/* Mobile */}
            <div className="mb-2">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("contact")}
                className="form-control"
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-2">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Pincode */}
            <div className="mb-2">
              <label>Pincode:</label>
              <input
                type="text"
                {...formik.getFieldProps("pincode")}
                className="form-control"
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-danger">{formik.errors.pincode}</div>
              )}
            </div>

            {/* Address */}
            <div className="mb-2">
              <label>Address:</label>
              <textarea
                rows="2"
                {...formik.getFieldProps("address")}
                className="form-control"
              ></textarea>
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-2">
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#28a745" }}
            >
              <strong>Login here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
