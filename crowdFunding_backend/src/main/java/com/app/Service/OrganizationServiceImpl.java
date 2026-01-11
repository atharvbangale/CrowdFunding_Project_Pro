package com.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.DTO.CreateOrganizationRequest;
import com.app.Entity.Organization;
import com.app.Entity.Role;
import com.app.Repository.OrganizationRepository;

@Service
public class OrganizationServiceImpl implements OrganizationService {

	@Autowired
	private OrganizationRepository organizationRepository;
	
	@Autowired
	  private PasswordEncoder passwordEncoder;

	@Override
	public Organization createOrganization(CreateOrganizationRequest request) {
		if (organizationRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already in use");
		}

		Organization org = new Organization();
		org.setName(request.getName());
		org.setDescription(request.getDescription());
		org.setEmail(request.getEmail());
		org.setRole(Role.ROLE_ORGANIZATION);
		org.setPassword(passwordEncoder.encode(request.getPassword())); // Ideally hash this
		return organizationRepository.save(org);
	}

	@Override
	public List<Organization> getAllOrganizations() {
		return organizationRepository.findAll();
	}

	@Override
	public Organization updateOrganization(Long id, Organization updatedOrg) {
		Organization existingOrg = organizationRepository.findById(id).orElse(null);
		if (existingOrg == null) {
			return null;
		}

		existingOrg.setName(updatedOrg.getName());
		existingOrg.setDescription(updatedOrg.getDescription());
		existingOrg.setEmail(updatedOrg.getEmail());
		existingOrg.setPassword(updatedOrg.getPassword());
//		existingOrg.setPassword(passwordEncoder.encode(updatedOrg.getPassword())); 

		return organizationRepository.save(existingOrg);
	}
	
	@Override
	public Organization getOrganizationById(Long id) {
	    return organizationRepository.findById(id)
	        .orElseThrow(() -> new RuntimeException("Organization not found with ID: " + id));
	}


}
