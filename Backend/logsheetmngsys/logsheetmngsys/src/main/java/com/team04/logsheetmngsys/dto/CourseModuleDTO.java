package com.team04.logsheetmngsys.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseModuleDTO {

    private Long courseId;

    private List<Long> moduleIds;
}