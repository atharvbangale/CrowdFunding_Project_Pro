import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Slides.css"; // Custom styles here

function Slides() {
  return (
    <div className="position-relative">
      <ToastContainer />
      
      {/* Background Image */}
      <img
        src="./assests/homePage.jpeg"
        className="img-fluid w-100"
        style={{
          height: "100vh",
          objectFit: "cover",
        }}
        alt="Homepage Background"
      />

      {/* Overlay Box with Green/White Text */}
      <div className="position-absolute top-50 start-50 translate-middle text-center p-4 rounded slide-overlay">
        <h1 className="display-5 fw-bold mb-3">
          Fuel innovation. <br /> Fund what matters.
        </h1>
        <p className="lead fs-4 fw-medium">
          Community-powered progress begins here.
        </p>
      </div>
    </div>
  );
}

export default Slides;
