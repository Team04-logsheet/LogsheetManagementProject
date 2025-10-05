package com.team04.logsheetmngsys.dto.responseDto;

import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String jwtToken;
    private String username; // e.g., user@example.com
    private String fullName; // e.g., "John Doe"
    private Collection<String> roles; // e.g., ["ROLE_ADMIN", "ROLE_USER"]
}