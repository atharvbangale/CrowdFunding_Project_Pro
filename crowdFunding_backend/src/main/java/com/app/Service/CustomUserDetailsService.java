package com.app.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.Entity.Organization;
import com.app.Entity.User;
import com.app.Repository.OrganizationRepository;
import com.app.Repository.UserRepository;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Check in User repository
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("Logged in User: " + user.getUserName() + ", Role: " + user.getRole());
            return new CustomUserDetails(user);
        }

        // Check in Organization repository
        Optional<Organization> orgOptional = organizationRepository.findByEmail(email);
        if (orgOptional.isPresent()) {
            Organization org = orgOptional.get();
            System.out.println("Logged in Organization: " + org.getName());
            return new CustomOrganizationDetails(org); // You need to implement this
        }

        throw new UsernameNotFoundException("No user or organization found with email: " + email);
    }
    
}
