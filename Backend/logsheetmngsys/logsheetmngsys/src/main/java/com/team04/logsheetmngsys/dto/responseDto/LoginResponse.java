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
    private String username; 
    private String fullName; 
    private Collection<String> roles; 
}