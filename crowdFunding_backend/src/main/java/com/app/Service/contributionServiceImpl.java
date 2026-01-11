package com.app.Service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.ContributionDtoResponse;
import com.app.Entity.Contribution;
import com.app.Repository.contributionRepository;
@Service
@Transactional
public class contributionServiceImpl implements contributionService {

	@Autowired
	private contributionRepository contributionRepository;
	
	public List<ContributionDtoResponse> getContributionsByFundId(Long fundId) {
	    List<Contribution> contributions = contributionRepository.findByFundId(fundId);
	    return contributions.stream()
	            .map(ContributionDtoResponse::new)
	            .collect(Collectors.toList());
	}


}
