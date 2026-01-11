import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer py-5" style={{ color: "black" }}>
      <div className="container1" style={{ padding: "5rem" }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mr-5">
            <h4>About Us</h4>
            <p>
            FunLin is your trusted crowdfunding platform that empowers changemakers,
              dreamers, and social entrepreneurs. From community upliftment projects to
              innovative startups, we connect passionate people with meaningful causes.
              Start your journey with us to make ideas happen through the power of collective support.
              
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to="/"
                  className="text-black"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-black"
                  style={{ textDecoration: "none" }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-black"
                  style={{ textDecoration: "none" }}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-black"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>City, State, 12345</li>
              <li>Email: info@example.com</li>
              <li>Phone: +123-456-7890</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="d-flex justify-content-center mt-4 mb-2">
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#3b5998", color: "white" }}
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#55acee", color: "white" }}
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#dd4b39", color: "white" }}
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#ac2bac", color: "white" }}
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#0082ca", color: "white" }}
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#333333", color: "white" }}
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div
          className="text-center mt-3 "
          style={{ backgroundColor: "#4CAF50", padding: "10px", marginBottom:"-7%" }}
        >
          © 2025 FunLin. Empowering Dreams, One Fund at a Time.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
