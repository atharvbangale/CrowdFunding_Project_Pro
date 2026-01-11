package com.app.Service;

import java.util.List;
import java.util.Map;

import com.app.DTO.FundEditDto;
import com.app.DTO.FundRequestDTO;
import com.app.DTO.FundResponseDTO;
import com.app.Entity.Contribution;
import com.app.Entity.Fund;

public interface FundService {

	FundResponseDTO createFund(Long orgId, FundRequestDTO fundRequestDTO);

	List<FundResponseDTO> getAllFunds();

	//Fund contributeToFund(Long fundId, double amount);

	List<FundResponseDTO> getFundsByOrganizationId(Long orgId);

	boolean isContributionAllowed(Long fundId, double amount);

//	Fund contributeToFund(Long fundId, Long userId, double amount);

	boolean canProceedToBuy(Long fundId, double amount);

	Fund editFund(Long fundId, FundEditDto dto);

	

	Contribution contributeToFund(Long fundId, Long userId, double amount);

	List<Map<String, Object>> getUserFundDetails(Long userId);

	Fund getFundById(Long fundId);

}
