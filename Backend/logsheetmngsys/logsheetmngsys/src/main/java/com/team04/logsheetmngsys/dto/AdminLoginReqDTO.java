package com.team04.logsheetmngsys.dto;

import lombok.Data;

@Data
public class AdminLoginReqDTO {

	private String userId;
	private String password;
	private String role;
}