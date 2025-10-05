package com.team04.logsheetmngsys.dto.responseDto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class StaffResponseDTO {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String contact;
	private String staffType;
	private Long roleId;
	private Boolean isActive;
	private LocalDateTime lastLogin;
	private Integer failedAttempts;
	private Boolean isAccountLocked;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
    private Boolean isDeleted;
}
