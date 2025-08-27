package com.team04.logsheetmngsys.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team04.logsheetmngsys.entity.AdminLogin;



public interface AdminLoginRepository extends JpaRepository<AdminLogin, Long> {
	
	Optional<AdminLogin> findByUserId(String userID);

	AdminLogin findByUserIdAndPassword(String userId, String password);

}
