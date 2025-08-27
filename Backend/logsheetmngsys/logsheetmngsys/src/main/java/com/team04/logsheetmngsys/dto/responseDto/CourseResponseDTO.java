package com.team04.logsheetmngsys.dto.responseDto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CourseResponseDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;

    // IDs for related entities
    private Long batchCycleId;
    private String batchCycleTitle; 

    private Long premiseId;
    private String premiseTitle; 

    private Long courseTypeId;
    private String courseTypeTitle; 
}
