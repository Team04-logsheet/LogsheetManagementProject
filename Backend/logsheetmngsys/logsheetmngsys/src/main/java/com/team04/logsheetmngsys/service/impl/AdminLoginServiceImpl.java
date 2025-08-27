package com.team04.logsheetmngsys.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.dto.AdminLoginReqDTO;
import com.team04.logsheetmngsys.dto.AdminLoginResDTO;
import com.team04.logsheetmngsys.entity.AdminLogin;
import com.team04.logsheetmngsys.repository.AdminLoginRepository;
import com.team04.logsheetmngsys.service.AdminLoginService;

import lombok.Data;

@Service
@Data
public class AdminLoginServiceImpl implements AdminLoginService {


	
	@Autowired
	private AdminLoginRepository adminLoginRepo;

	@Override
	public AdminLogin addAdminLogin(AdminLogin admin) {
		// TODO Auto-generated method stub
		return adminLoginRepo.save(admin);
	}

	
	@Override
    public AdminLoginResDTO login(AdminLoginReqDTO request) {
        AdminLogin admin = adminLoginRepo.findByUserIdAndPassword(request.getUserId(), request.getPassword());

        AdminLoginResDTO response = new AdminLoginResDTO();
        if (admin != null && "admin".equalsIgnoreCase(admin.getRole())) {
            response.setMessage("Login successful");
            response.setRole(admin.getRole());
        } else {
            response.setMessage("Invalid credentials or not an admin");
            response.setRole(null);
        }
        return response;
    }
}
