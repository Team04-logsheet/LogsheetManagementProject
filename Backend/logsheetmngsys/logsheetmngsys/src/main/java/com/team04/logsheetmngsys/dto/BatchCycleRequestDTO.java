package com.team04.logsheetmngsys.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BatchCycleRequestDTO {
 private String title;
 private String description;

 @JsonFormat(pattern = "yyyy-MM-dd")
 private LocalDate startDate;

 @JsonFormat(pattern = "yyyy-MM-dd")
 private LocalDate endDate;
 
}
