package com.app.Controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.ContributionRequest;
import com.app.Entity.Contribution;
import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.FundService;
import com.app.Service.UserService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000")
public class UserController {
@Autowired
    private  UserService userService;

@Autowired
private FundService fundService;

@Autowired
  private PasswordEncoder passwordEncoder;


  

    // 1. Register a new customer
    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
        	user.setPassword(passwordEncoder.encode(user.getPassword()));
        	 user.setRole(Role.ROLE_CUSTOMER);
            User newUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }

    // 2. Edit customer details
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        try {
            User existingUser = userService.getUserById(id); // Fetch current user

            // Update fields from incoming data
            existingUser.setUserName(userDetails.getUserName());
            existingUser.setContact(userDetails.getContact());
            existingUser.setEmail(userDetails.getEmail());
            existingUser.setAddress(userDetails.getAddress());
            existingUser.setPincode(userDetails.getPincode());

            // Only update password if provided
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            User updatedUser = userService.updateUser(id, existingUser);
            return ResponseEntity.ok(updatedUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
        }
    }


    @GetMapping("/getUsersByRole/{role}")
	  public ResponseEntity<?> getAllCustomer() {
	      try {
	          List<User> users = userService.getUsersByRole(Role.ROLE_CUSTOMER );
	          return ResponseEntity.ok(users);
	      } catch (Exception e) {
	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching users by role");
	      }
	  }

    // 4. Get customer by ID
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
    
    @PostMapping("/buyFunds/{fundId}")
    public ResponseEntity<String> contributeToFund(@PathVariable Long fundId,
                                                   @RequestBody ContributionRequest request) {
        Contribution contribution = fundService.contributeToFund(fundId, request.getUserId(), request.getAmount());

        return ResponseEntity.ok("Contribution ID: " + contribution.getId());
    }
    
    @GetMapping("/checkContributionEligibility")
    public ResponseEntity<?> checkContributionEligibility(
            @RequestParam Long fundId,
            @RequestParam double amount) {

        boolean canContribute = fundService.canProceedToBuy(fundId, amount);

        if (canContribute) {
            return ResponseEntity.ok(" Proceed to buy");
        } else {
            return ResponseEntity
                    .badRequest()
                    .body(" Cannot proceed. Amount exceeds maximum allowed for this fund.");
        }
    }
    
    @GetMapping("/getFundsByUser/{userId}")
    public ResponseEntity<?> getFundsByUser(@PathVariable Long userId) {
        try {
            List<Map<String, Object>> userFunds = fundService.getUserFundDetails(userId);

            if (userFunds.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body("No funds found for the given user ID.");
            }

            return ResponseEntity.ok(userFunds);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("An error occurred while fetching user funds: " + e.getMessage());
        }
    }
   
}

