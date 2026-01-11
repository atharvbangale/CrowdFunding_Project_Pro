import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
import "./ViewAllFundings.css";

const ViewAllFundings = () => {
  const [groupedFundings, setGroupedFundings] = useState({});
  const [expandedOrgs, setExpandedOrgs] = useState({});
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
    const fetchFundings = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/admin/getAllFunds",
          config
        );

        const data = response.data;

        const grouped = data.reduce((acc, fund) => {
          if (!acc[fund.organizationName]) {
            acc[fund.organizationName] = [];
          }
          acc[fund.organizationName].push(fund);
          return acc;
        }, {});

        setGroupedFundings(grouped);
      } catch (error) {
        console.error("Error fetching fundings:", error);
        alert("Failed to fetch fundings.");
      }
    };

    fetchFundings();
  }, []);

  const toggleOrg = (orgName) => {
    setExpandedOrgs((prev) => ({
      ...prev,
      [orgName]: !prev[orgName],
    }));
  };

  return (
    <Admin>
      <div className="fundings-container">
        <h2>All Fundings by Organization</h2>

        {Object.keys(groupedFundings).map((orgName) => (
          <div key={orgName} className="organization-section">
            <div
              className="organization-title clickable"
              onClick={() => toggleOrg(orgName)}
            >
              <h3>
                {orgName}
                <span style={{ float: "right" }}>
                  {expandedOrgs[orgName] ? "▲" : "▼"}
                </span>
              </h3>
            </div>

            {expandedOrgs[orgName] && (
              <div className="table-wrapper">
                <table className="fund-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Max Amount</th>
                      <th>Raised Amount</th>
                      <th>Duration</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedFundings[orgName].map((fund) => (
                      <tr key={fund.id}>
                        <td>{fund.title}</td>
                        <td>{fund.description}</td>
                        <td>₹{fund.maxAmount}</td>
                        <td>₹{fund.raisedAmount}</td>
                        <td>{fund.startDate} to {fund.endDate}</td>
                        <td>{fund.closed ? "Closed" : "Active"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </Admin>
  );
};

export default ViewAllFundings;
