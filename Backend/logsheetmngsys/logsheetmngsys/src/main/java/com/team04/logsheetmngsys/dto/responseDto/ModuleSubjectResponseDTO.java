package com.team04.logsheetmngsys.dto.responseDto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ModuleSubjectResponseDTO {

    private Long id; 
    private Long moduleId;
    private String moduleTitle;
    private Long subjectId;
    private String subjectName;
}