package com.team04.logsheetmngsys.dto.responseDto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemResponseDTO {

    private Long id;
    
    private String title;
    
    private String description;
    
    private String backendApiUrlPath;
    
    private String frontendPageUrl;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}