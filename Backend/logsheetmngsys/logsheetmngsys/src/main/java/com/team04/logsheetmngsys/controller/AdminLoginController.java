package com.team04.logsheetmngsys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.AdminLoginReqDTO;
import com.team04.logsheetmngsys.dto.AdminLoginResDTO;
import com.team04.logsheetmngsys.entity.AdminLogin;
import com.team04.logsheetmngsys.service.AdminLoginService;

@RestController
@RequestMapping("/admin")
public class AdminLoginController {

    @Autowired
    private AdminLoginService adminLoginService;

    
    @PostMapping("/register")
    public ResponseEntity<AdminLogin> registerAdmin(@RequestBody AdminLogin admin) {
        return ResponseEntity.ok(adminLoginService.addAdminLogin(admin));
    }

  
    @PostMapping("/login")
    public ResponseEntity<AdminLoginResDTO> login(@RequestBody AdminLoginReqDTO request) {
        return ResponseEntity.ok(adminLoginService.login(request));
    }
}