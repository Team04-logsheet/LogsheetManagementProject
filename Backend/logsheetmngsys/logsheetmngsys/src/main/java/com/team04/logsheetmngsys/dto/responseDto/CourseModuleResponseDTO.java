package com.team04.logsheetmngsys.dto.responseDto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CourseModuleResponseDTO {

    private Long id; 
    private Long courseId;
    private String courseName;
    private Long moduleId;
    private String moduleTitle;
}