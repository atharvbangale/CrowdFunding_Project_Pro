package com.app.DTO;

import java.time.LocalDate;

import com.app.Entity.Fund;

public class FundResponseDTO {

    private Long id;
    private String title;
    private String description;
    private Double maxAmount;
    private Double raisedAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isClosed;
    private Long organizationId;
    private String organizationName;

    // Constructors
    public FundResponseDTO() {}

    public FundResponseDTO(Fund fund) {
        this.id = fund.getId();
        this.title = fund.getTitle();
        this.description = fund.getDescription();
        this.maxAmount = fund.getMaxAmount();
        this.raisedAmount = fund.getRaisedAmount();
        this.startDate = fund.getStartDate();
        this.endDate = fund.getEndDate();
        this.isClosed = fund.isClosed();
        this.organizationId = fund.getOrganization().getId();
        this.organizationName = fund.getOrganization().getName();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}

	public Double getRaisedAmount() {
		return raisedAmount;
	}

	public void setRaisedAmount(Double raisedAmount) {
		this.raisedAmount = raisedAmount;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public boolean isClosed() {
		return isClosed;
	}

	public void setClosed(boolean isClosed) {
		this.isClosed = isClosed;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

    
    
    
}

