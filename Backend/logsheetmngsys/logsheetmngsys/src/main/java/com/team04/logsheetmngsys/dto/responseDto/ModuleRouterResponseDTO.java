package com.team04.logsheetmngsys.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModuleRouterResponseDTO {
    private Long id;
    private Long moduleId;
    private String moduleTitle; 
    private Long staffId;
    private String staffName;
    private Boolean isActive;
}