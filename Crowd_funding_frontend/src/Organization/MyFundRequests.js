import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Organization from "./Organization";
import { FaRupeeSign } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Modal, Button, Form } from "react-bootstrap";

import "./MyFundRequests.css";

function MyFundRequests() {
  const [funds, setFunds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

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
    const fetchFunds = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const orgId = sessionStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8080/organization/getFundsByOrganization/${orgId}`,
          config
        );
        setFunds(response.data);
      } catch (error) {
        console.error("Error fetching fund requests:", error);
      }
    };

    fetchFunds();
  }, []);

  const handleEdit = async (fundId, event) => {
    event.stopPropagation(); // prevents triggering card click
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/organization/getFundById/${fundId}`,
        config
      );
      const fund = response.data;
      setSelectedFund(fund);
      setEditAmount(fund.maxAmount);
      setEditEndDate(fund.endDate);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to load fund:", error);
    }
  };

  const getProgress = (raised, max) => {
    return Math.min((raised / max) * 100, 100).toFixed(1);
  };

  const handleSaveEdit = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    const dto = {
      maxAmount: editAmount,
      endDate: editEndDate,
    };

    await axios.put(
      `http://localhost:8080/organization/editFund/${selectedFund.id}`,
      dto,
      config
    );

    // Refresh funds list
    const orgId = sessionStorage.getItem("userId");
    const refreshed = await axios.get(
      `http://localhost:8080/organization/getFundsByOrganization/${orgId}`,
      config
    );
    setFunds(refreshed.data);

    setShowModal(false);
  } catch (error) {
    console.error("Failed to update fund:", error);
  }
};


 

return (
  <Organization>
    <div className="my-5">
      <h2 className="text-center text-success mb-4"> My Fund Requests</h2>

      <div className="row g-4">
        {funds.length > 0 ? (
          funds.map((fund) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={fund.id}>
              <div
                className="card h-100 shadow-sm border border-success d-flex flex-column cursor-pointer"
                onClick={() =>
                  navigate(`/organization/viewfundings/${fund.id}`)
                }
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-success fw-bold">
                      {fund.title}
                    </h5>
                    <p className="card-text text-muted">{fund.description}</p>

                    <div className="mb-2">
                      <strong>
                        <FaRupeeSign /> Max Amount:
                      </strong>{" "}
                      ₹{fund.maxAmount.toLocaleString()}
                    </div>
                    <div className="mb-2">
                      <strong>
                        <FaRupeeSign /> Raised:
                      </strong>{" "}
                      ₹{fund.raisedAmount.toLocaleString()}
                    </div>

                    <div className="progress mb-2" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar ${
                          getProgress(fund.raisedAmount, fund.maxAmount) >= 100
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                        style={{
                          width: `${getProgress(
                            fund.raisedAmount,
                            fund.maxAmount
                          )}%`,
                        }}
                      />
                    </div>
                    <small className="text-muted">
                      {getProgress(fund.raisedAmount, fund.maxAmount)}% funded
                    </small>

                    <hr />

                    <div>
                      <strong>Start:</strong> {fund.startDate}
                      <br />
                      <strong>End:</strong> {fund.endDate}
                    </div>

                    <div className="mt-2">
                      <strong>Status:</strong>{" "}
                      {fund.closed ? (
                        <span className="badge bg-danger">Closed</span>
                      ) : (
                        <span className="badge bg-success">Open</span>
                      )}
                    </div>
                  </div>

                  {!fund.closed && (
                    <button
                      className="btn btn-outline-success btn-sm mt-3 w-100"
                      onClick={(e) => handleEdit(fund.id, e)}
                    >
                      <MdEdit /> Edit Fund
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No fund requests found.</div>
        )}
      </div>
    </div>

    {/* MODAL GOES HERE */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Fund #{selectedFund?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editAmount" className="mb-3">
            <Form.Label>Maximum Amount</Form.Label>
            <Form.Control
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editEndDate" className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSaveEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </Organization>
);

}

export default MyFundRequests;
