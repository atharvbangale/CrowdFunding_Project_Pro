package com.app.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    boolean existsByEmail(String email);
    
    Organization getOrganizationById(Long id);

	Optional<Organization> findByEmail(String email);

}
