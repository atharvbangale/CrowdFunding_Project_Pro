package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.ContributionDtoResponse;
import com.app.DTO.CreateOrganizationRequest;
import com.app.DTO.FundResponseDTO;
import com.app.Entity.Organization;
import com.app.Service.FundService;
import com.app.Service.OrganizationService;
import com.app.Service.contributionService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;
    
    @Autowired
	private FundService fundService;
    
	@Autowired
	private contributionService contributionService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/registerOrganization")
    public ResponseEntity<Organization> registerOrganization(@RequestBody CreateOrganizationRequest request) {
    	
        Organization org = organizationService.createOrganization(request);
        return new ResponseEntity<>(org, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/getAllOrganizations")
    public ResponseEntity<?> getAllOrganizations() {
        try {
            List<Organization> orgs = organizationService.getAllOrganizations();
            return new ResponseEntity<>(orgs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to fetch organizations: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateOrganization/{id}")
    public ResponseEntity<?> updateOrganization(@PathVariable Long id, @RequestBody Organization updatedOrg) {
        try {
            Organization savedOrg = organizationService.updateOrganization(id, updatedOrg);
            if (savedOrg == null) {
                return new ResponseEntity<>("Organization not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(savedOrg, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update organization: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
	// 2. View All Funds
	@GetMapping("/getAllFunds")
	public ResponseEntity<?> getAllFunds() {
		try {
			List<FundResponseDTO> funds = fundService.getAllFunds();
			return new ResponseEntity<>(funds, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Failed to fetch funds: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
    @GetMapping("/getFundsByOrganization/{orgId}")
    public ResponseEntity<?> getFundsByOrganization(@PathVariable Long orgId) {
        try {
            List<FundResponseDTO> orgFunds = fundService.getFundsByOrganizationId(orgId);
            return ResponseEntity.ok(orgFunds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching organization's funds: " + e.getMessage());
        }
    }

    @GetMapping("/getOrganizationById/{id}")
    public ResponseEntity<?> getOrganizationById(@PathVariable Long id) {
        try {
            Organization org = organizationService.getOrganizationById(id);
            return new ResponseEntity<>(org, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Organization not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/getContributionsByFundId/{fundId}")
	public ResponseEntity<?> getContributionsByFundId(@PathVariable Long fundId) {
		try {
			List<ContributionDtoResponse> response = contributionService.getContributionsByFundId(fundId);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch contributions");
		}
	}


}
