package com.app.DTO;

public class PaymentRequestDTO {

    private Long contributionId;
    private Double amount;
    private String paymentStatus;

    // Constructors
    public PaymentRequestDTO() {}

    public PaymentRequestDTO(Long contributionId, Double amount, String paymentStatus) {
        this.contributionId = contributionId;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
    }

    // Getters and Setters
    public Long getContributionId() {
        return contributionId;
    }

    public void setContributionId(Long contributionId) {
        this.contributionId = contributionId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
