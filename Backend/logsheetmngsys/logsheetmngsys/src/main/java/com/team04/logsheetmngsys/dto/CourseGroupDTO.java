package com.team04.logsheetmngsys.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseGroupDTO {

    private Long courseId;

    private List<Long> groupIds;

}