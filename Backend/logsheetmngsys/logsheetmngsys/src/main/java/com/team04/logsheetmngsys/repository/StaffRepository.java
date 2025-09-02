package com.team04.logsheetmngsys.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team04.logsheetmngsys.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

	Optional<Staff> findByEmail(String email);
	
}
