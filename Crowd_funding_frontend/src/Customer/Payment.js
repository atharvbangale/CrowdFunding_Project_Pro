import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Support both fund and cart flows
  const {
    fundId,
    amount, // For fund contribution
    totalPrice = 0, // For cart payment
    products = [],
  } = location.state || {};

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    }
  }, [navigate]);

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) return false;
    const expirationDate = new Date(year, month - 1);
    const today = new Date();
    return expirationDate >= new Date(today.getFullYear(), today.getMonth());
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!cardNumber || !cardHolderName || !expiration || !cvv) {
    setError("Please fill in all fields.");
    return;
  }

  if (!validateCardNumber(cardNumber)) {
    setError("Card number must be 16 digits.");
    return;
  }

  if (!validateExpirationDate(expiration)) {
    setError("Expiration date is invalid or in the past.");
    return;
  }

  setError("");
  setIsSubmitting(true);

  const userId = sessionStorage.getItem("userId");
  const jwtToken = sessionStorage.getItem("jwtToken");

  if (!userId || !jwtToken) {
    setError("User is not logged in.");
    setIsSubmitting(false);
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    if (!fundId || !amount) {
      throw new Error("Missing fundId or amount.");
    }

    // 1. Call contributeToFund to get Contribution ID
    const contributeResponse = await axios.post(
      `http://localhost:8080/customer/buyFunds/${fundId}`,
      {
        userId,
        amount: parseFloat(amount),
      },
      config
    );

    const contributionIdMatch = contributeResponse.data.match(/\d+/);
    const contributionId = contributionIdMatch ? parseInt(contributionIdMatch[0]) : null;

    if (!contributionId) {
      throw new Error("Failed to extract contribution ID.");
    }

    // 2. Call processPayment using the contributionId
    const paymentPayload = {
      contributionId,
      amount: parseFloat(amount),
      paymentStatus: "PAID",
    };

    const paymentResponse = await axios.post(
      `http://localhost:8080/customer/processPayment`,
      paymentPayload,
      config
    );

    if (paymentResponse.data.status === "PAID") {
      toast.success(" Fund contribution successful!", {
        autoClose: 2000,
        position: "top-right",
      });

      setTimeout(() => navigate("/yourfunds"), 2500);
    } else {
      throw new Error("Payment failed.");
    }
  } catch (error) {
    console.error("Error during fund contribution/payment:", error.response || error.message);
    setError("Payment failed. Please try again.");
    toast.error(" Payment failed. Please try again.", {
      autoClose: 2000,
      position: "top-right",
    });
  }

  setIsSubmitting(false);
};


  const displayAmount = parseFloat(amount || totalPrice || 0);

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex align-items-center">
                  <MDBCol size="9">
                    <MDBInput
                      label="Card Number"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3457"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="9">
                    <MDBInput
                      label="Cardholder's Name"
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      required
                    />
                  </MDBCol>

                  <MDBCol size="6">
                    <MDBInput
                      label="Expiration"
                      type="text"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="MM/YYYY"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBInput
                      label="CVV"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="***"
                      required
                    />
                  </MDBCol>

                  {error && (
                    <MDBCol size="12" className="text-danger mt-2">
                      {error}
                    </MDBCol>
                  )}

                  <MDBCol size="12" className="text-center mt-3">
                    <h5>Total Amount: ₹{displayAmount.toFixed(2)}</h5>
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBBtn
                      color="info"
                      rounded
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : <MDBIcon fas icon="arrow-right" />}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}
