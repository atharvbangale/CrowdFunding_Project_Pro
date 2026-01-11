package com.app.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.FundEditDto;
import com.app.DTO.FundRequestDTO;
import com.app.DTO.FundResponseDTO;
import com.app.Entity.Contribution;
import com.app.Entity.Fund;
import com.app.Entity.Organization;
import com.app.Entity.User;
import com.app.Repository.FundRepository;
import com.app.Repository.OrganizationRepository;
import com.app.Repository.UserRepository;
import com.app.Repository.contributionRepository;

@Service
public class FundServiceImpl implements FundService {

	@Autowired
	private FundRepository fundRepository;

	@Autowired
	private OrganizationRepository organizationRepository;

	@Autowired
	private contributionRepository contributionRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public FundResponseDTO createFund(Long orgId, FundRequestDTO dto) {
		Organization org = organizationRepository.findById(orgId)
				.orElseThrow(() -> new RuntimeException("Organization not found"));

		Fund fund = new Fund();
		fund.setTitle(dto.getTitle());
		fund.setDescription(dto.getDescription());
		fund.setMaxAmount(dto.getMaxAmount());
		fund.setEndDate(dto.getEndDate());
		fund.setStartDate(LocalDate.now());
		fund.setRaisedAmount(0.0);
		fund.setClosed(false);
		fund.setOrganization(org);

		Fund savedFund = fundRepository.save(fund);
		return new FundResponseDTO(savedFund);
	}

	@Override
	public List<FundResponseDTO> getAllFunds() {
		List<Fund> funds = fundRepository.findAll();
		return funds.stream().map(FundResponseDTO::new).collect(Collectors.toList());
	}

//	@Override
//	public Fund contributeToFund(Long fundId, Long userId, double amount) {
//		Fund fund = fundRepository.findById(fundId).orElseThrow(() -> new RuntimeException("Fund not found"));
//		if (fund.isClosed()) {
//			throw new RuntimeException("This fund is already closed.");
//		}
//
//		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//
//		double newTotal = fund.getRaisedAmount() + amount;
//
//		// Update fund's raised amount and close if goal reached
//		if (newTotal >= fund.getMaxAmount()) {
//			fund.setRaisedAmount(fund.getMaxAmount());
//			fund.setClosed(true);
//		} else {
//			fund.setRaisedAmount(newTotal);
//		}
//
//		Fund updatedFund = fundRepository.save(fund);
//
//		// Create contribution
//		Contribution contribution = new Contribution();
//		contribution.setUser(user);
//		contribution.setFund(fund);
//		contribution.setAmount(amount);
//		contribution.setContributionDate(LocalDate.now());
//		contributionRepository.save(contribution);
//
//		return updatedFund;
//	}

	@Override
	public List<FundResponseDTO> getFundsByOrganizationId(Long orgId) {
		List<Fund> funds = fundRepository.findByOrganizationId(orgId);
		return funds.stream().map(FundResponseDTO::new).collect(Collectors.toList());
	}

	@Override
	public boolean isContributionAllowed(Long fundId, double contributionAmount) {
		Fund fund = fundRepository.findById(fundId).orElseThrow(() -> new RuntimeException("Fund not found"));

		double newTotal = fund.getRaisedAmount() + contributionAmount;
		return newTotal <= fund.getMaxAmount();
	}

	@Override
	public boolean canProceedToBuy(Long fundId, double amount) {
		Fund fund = fundRepository.findById(fundId).orElseThrow(() -> new RuntimeException("Fund not found"));

		double potentialTotal = fund.getRaisedAmount() + amount;

		return potentialTotal <= fund.getMaxAmount();
	}

	@Override
	public Fund editFund(Long fundId, FundEditDto dto) {
		Fund fund = fundRepository.findById(fundId)
				.orElseThrow(() -> new RuntimeException("Fund not found with id: " + fundId));

		fund.setMaxAmount(dto.getMaxAmount());
		fund.setEndDate(dto.getEndDate());

		return fundRepository.save(fund);
	}
	
	@Override
	public Contribution contributeToFund(Long fundId, Long userId, double amount) {
	    Fund fund = fundRepository.findById(fundId)
	            .orElseThrow(() -> new RuntimeException("Fund not found"));

	    if (fund.isClosed()) {
	        throw new RuntimeException("This fund is already closed.");
	    }

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    double newTotal = fund.getRaisedAmount() + amount;

	    if (newTotal >= fund.getMaxAmount()) {
	        fund.setRaisedAmount(fund.getMaxAmount());
	        fund.setClosed(true);
	    } else {
	        fund.setRaisedAmount(newTotal);
	    }

	    fundRepository.save(fund);

	    Contribution contribution = new Contribution();
	    contribution.setUser(user);
	    contribution.setFund(fund);
	    contribution.setAmount(amount);
	    contribution.setContributionDate(LocalDate.now());

	    return contributionRepository.save(contribution);
	}
	
	@Override
	public List<Map<String, Object>> getUserFundDetails(Long userId) {
	    List<Contribution> contributions = contributionRepository.findByUserId(userId);

	    List<Map<String, Object>> result = new ArrayList<>();

	    for (Contribution c : contributions) {
	        Map<String, Object> fundInfo = new HashMap<>();
	        fundInfo.put("fundName", c.getFund().getTitle());
	        fundInfo.put("amount", c.getAmount());
	        fundInfo.put("contributionDate", c.getContributionDate());
	        result.add(fundInfo);
	    }

	    return result;
	}
	
	// FundServiceImpl.java
	@Override
	public Fund getFundById(Long fundId) {
	    return fundRepository.findById(fundId)
	        .orElseThrow(() -> new RuntimeException("Fund not found with ID: " + fundId));
	}
}
