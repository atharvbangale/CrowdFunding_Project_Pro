package com.app.DTO;

import java.time.LocalDate;

import com.app.Entity.Contribution;

public class ContributionDtoResponse {

    private String userName;
    private LocalDate contributionDate;
    private Double amount;

    public ContributionDtoResponse(Contribution contribution) {
        this.userName = contribution.getUser().getUserName(); 
        this.contributionDate = contribution.getContributionDate();
        this.amount = contribution.getAmount();
    }

    // Getters and Setters
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDate getContributionDate() {
        return contributionDate;
    }

    public void setContributionDate(LocalDate contributionDate) {
        this.contributionDate = contributionDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
