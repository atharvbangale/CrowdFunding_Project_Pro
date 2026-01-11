import React from "react";

function Section1() {
  return (
    <div className="mycontainer my-5" style={{padding:"5%"}}>
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1">Digital Grampanchayat</h2>
          <p className="mb-4 me-5 fs-5">
            Welcome to Digital Grampanchayat! 🌱 Our platform is designed to
            empower villagers by providing easy access to government schemes and
            allowing them to apply online. Now, you can explore various welfare
            programs related to agriculture, education, healthcare, and
            employment—all from the comfort of your home. With a seamless
            application process, real-time status tracking, and secure digital
            document submission, we ensure transparency and efficiency. Say
            goodbye to long queues and paperwork—Digital Grampanchayat brings
            governance to your fingertips, making rural development smarter and
            more accessible! 🚀
          </p>
          <button className="btn btn-dark mb-4">Read More</button>
        </div>

        <div className="col-lg-5 col-md-6 col-12">
          <div className="row g-2">
            <img
              src="./assests/home5.jpg"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
