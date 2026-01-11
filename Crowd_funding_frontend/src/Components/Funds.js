import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRupeeSign, FaHandHoldingHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Funds.css";

function Funds() {
  const [funds, setFunds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [amount, setAmount] = useState("");
  const [amountValid, setAmountValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/organization/getAllFunds"
        );
        setFunds(response.data);
      } catch (error) {
        toast.error("Failed to fetch funds", { autoClose: 3000 });
        console.error("Error fetching funds:", error);
      }
    };
    fetchFunds();
  }, []);

  const handleShowModal = (fund) => {
    setSelectedFund(fund);
    setAmount("");
    setAmountValid(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const checkAmount = async () => {
    if (!selectedFund || !amount) return;

    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(
        "http://localhost:8080/customer/checkContributionEligibility",
        {
          params: {
            fundId: selectedFund.id,
            amount: parseFloat(amount),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data, { autoClose: 3000 });
      setAmountValid(true);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data, { autoClose: 3000 });
      } else {
        toast.error(" Error validating amount.", { autoClose: 3000 });
      }
      setAmountValid(false);
    }
  };

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        fundId: selectedFund.id,
        amount: parseFloat(amount),
      },
    });
  };

  const getProgress = (raised, max) => {
    if (!raised || !max || max === 0) return 0;
    return Math.min((raised / max) * 100, 100).toFixed(1);
  };

  return (
    <div className="mt-4">
      <ToastContainer />
      <h2 className="text-center text-success mb-5">
        <FaHandHoldingHeart className="me-2" />
        Support a Cause
      </h2>
      <div className="row">
        {funds.map((fund) => (
          <div className="col-md-6 col-lg-4 mb-4" key={fund.id}>
            <div
              className={`card h-100 shadow-lg border-0 ${
                fund.closed ? "bg-light" : "bg-white"
              }`}
            >
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">
                  {fund.title}
                </h5>
                <p className="card-text text-secondary">{fund.description}</p>

                <p className="mb-1">
                  <strong>Goal:</strong> <FaRupeeSign /> {fund.maxAmount}
                </p>
                <p className="mb-1">
                  <strong>Raised:</strong> <FaRupeeSign /> {fund.raisedAmount}
                </p>

                <ProgressBar
                  now={getProgress(fund.raisedAmount, fund.maxAmount)}
                  label={`${getProgress(fund.raisedAmount, fund.maxAmount)}%`}
                  variant={fund.closed ? "danger" : "success"}
                  className="mb-3"
                />

                <p className="text-muted">
                  Ends on: <strong>{fund.endDate}</strong>
                </p>

                <button
                  className={`btn w-100 ${
                    fund.closed ? "btn-secondary" : "btn-outline-success"
                  }`}
                  onClick={() => {
                    const userId = sessionStorage.getItem("userId");
                    if (userId) {
                      handleShowModal(fund);
                    } else {
                      toast.warn("Please login to contribute!", {
                        position: "top-center",
                        autoClose: 2000, // 2 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                      });
                    }
                  }}
                  disabled={fund.closed}
                >
                  {fund.closed ? "Closed" : "Contribute"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contribute to: {selectedFund?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="amount">
              <Form.Label>Enter Contribution Amount</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="e.g., 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <div className="mt-4 d-flex justify-content-between">
              <Button variant="outline-primary" onClick={checkAmount}>
                Check Limit
              </Button>
              <Button
                variant="success"
                onClick={handlePayment}
                disabled={!amountValid}
              >
                Proceed to Pay
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Funds;
