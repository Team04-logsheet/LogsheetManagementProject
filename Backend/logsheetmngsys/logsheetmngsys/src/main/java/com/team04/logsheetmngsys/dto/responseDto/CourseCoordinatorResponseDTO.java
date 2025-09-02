package com.team04.logsheetmngsys.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseCoordinatorResponseDTO {
    private Long id;
    private Long courseId;
    private String courseTitle;  
    private Long staffId;
    private String staffName;    
    private Boolean isActive;
}