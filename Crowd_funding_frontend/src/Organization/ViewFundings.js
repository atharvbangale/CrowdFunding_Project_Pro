import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import Organization from "./Organization";
import "./ViewFundings.css";

const ViewFundings = () => {
  const { fundId } = useParams();
  const [contributions, setContributions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/organization/getContributionsByFundId/${fundId}`,
          config
        );
        setContributions(response.data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchContributions();
  }, [fundId]);

  return (
    <Organization>
      <div className=" my-5">
        <h2 className="text-center text-success mb-4">
          Contributions for Funds
        </h2>

        {contributions.length === 0 ? (
          <p className="text-center text-muted">No contributions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered shadow-sm">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Contributor</th>
                  <th>Date</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((contribution, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contribution.userName || "Anonymous"}</td>
                    <td>{contribution.contributionDate}</td>
                    <td>
                      <FaRupeeSign /> {contribution.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-success"
            onClick={() => navigate("/organization/viewfundraised")}
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </Organization>
  );
};

export default ViewFundings;
