package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Contribution;

public interface contributionRepository extends JpaRepository<Contribution, Long> {

	List<Contribution> findByFundId(Long fundId);

	List<Contribution> findByUserId(Long userId);

}
