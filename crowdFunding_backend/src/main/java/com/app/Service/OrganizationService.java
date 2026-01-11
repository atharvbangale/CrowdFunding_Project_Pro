package com.app.Service;

import java.util.List;

import com.app.DTO.CreateOrganizationRequest;
import com.app.Entity.Organization;

public interface OrganizationService {

	Organization createOrganization(CreateOrganizationRequest request);

	List<Organization> getAllOrganizations();

	Organization updateOrganization(Long id, Organization updatedOrg);

	Organization getOrganizationById(Long id);

	
}
