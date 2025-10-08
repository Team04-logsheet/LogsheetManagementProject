package com.team04.logsheetmngsys.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModuleSubjectDTO {

    private Long moduleId;
    private List<Long> subjectIds;
}