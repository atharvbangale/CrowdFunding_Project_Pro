import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerNavbar from "../Components/CustomerNavbar";
import "./YourFunds.css";

function YourFunds() {
  const [schemes, setSchemes] = useState([]);
  const customerId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    } else if (sessionStorage.getItem("userRole") === "ORGANIZATION") {
      navigate("/organization");
    }
  }, [navigate]);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/customer/getFundsByUser/${customerId}`,
        config
      );

      setSchemes(response.data || []);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="scheme-container">
        <h2 className="scheme-heading">My Contributions</h2>
        {schemes.length > 0 ? (
          <div className="scheme-table-wrapper">
            <table className="scheme-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fund Name</th>
                  <th>Amount Contributed</th>
                  <th>Date of Contribution</th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((scheme, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{scheme.fundName}</td>
                    <td>₹{scheme.amount}</td>
                    <td>{new Date(scheme.contributionDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-scheme-message">
            You haven't contributed to any funds yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default YourFunds;
