package com.app.Service;

import java.util.List;

import com.app.DTO.ContributionDtoResponse;

public interface contributionService {

	List<ContributionDtoResponse> getContributionsByFundId(Long fundId);
	

}
