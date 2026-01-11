package com.app.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Fund;

public interface FundRepository extends JpaRepository<Fund, Long> {
	
	List<Fund> findByOrganizationId(Long organizationId);
	
	 Optional<Fund> findById(Long fundId);
}

