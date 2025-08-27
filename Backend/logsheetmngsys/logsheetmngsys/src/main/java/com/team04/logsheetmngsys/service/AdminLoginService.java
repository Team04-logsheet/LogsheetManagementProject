package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.AdminLoginReqDTO;
import com.team04.logsheetmngsys.dto.AdminLoginResDTO;
import com.team04.logsheetmngsys.entity.AdminLogin;

public interface AdminLoginService {
	
	AdminLogin addAdminLogin (AdminLogin admin);
	
	AdminLoginResDTO login (AdminLoginReqDTO request);

}

