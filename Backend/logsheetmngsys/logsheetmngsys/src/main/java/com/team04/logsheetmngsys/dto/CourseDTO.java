package com.team04.logsheetmngsys.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CourseDTO {
    @NotBlank(message = "Course name is required")
    @Size(max = 255, message = "Course name cannot exceed 255 characters")
    private String name;

    @NotNull(message = "Batch Cycle ID is required")
    private Long batchCycleId;

    @NotNull(message = "Premise ID is required")
    private Long premiseId;

    @NotNull(message = "Course Type ID is required")
    private Long courseTypeId;

    @Size(max = 100, message = "Description cannot exceed 100 characters")
    private String description;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;
}
