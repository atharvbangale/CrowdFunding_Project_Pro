package com.app.DTO;

import java.time.LocalDate;

public class FundEditDto {

	private double maxAmount;
	private LocalDate endDate;

	// Getters & Setters
	public double getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(double maxAmount) {
		this.maxAmount = maxAmount;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

}
