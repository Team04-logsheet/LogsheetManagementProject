package com.team04.logsheetmngsys.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class StaffDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String contact;
	private String staffType;
	private Long roleId;
	private String activityStatus;
	private LocalDateTime lastLogin;
	private Integer failedAttempts;
	private Boolean isAccountLocked;
}
