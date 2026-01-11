package com.app.DTO;

import java.time.LocalDate;

public class PaymentResponseDTO {
    private Long paymentId;
    private String fundName;
    private String userName;
    private LocalDate paymentDate;
    private Double amount;
    private String status;

    public PaymentResponseDTO(Long paymentId, String fundName, String userName, LocalDate paymentDate,
                              Double amount, String status) {
        this.paymentId = paymentId;
        this.fundName = fundName;
        this.userName = userName;
        this.paymentDate = paymentDate;
        this.amount = amount;
        this.status = status;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public String getFundName() {
        return fundName;
    }

    public String getUserName() {
        return userName;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public Double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }
}
