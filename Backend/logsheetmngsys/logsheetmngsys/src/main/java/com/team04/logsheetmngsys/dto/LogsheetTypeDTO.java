package com.team04.logsheetmngsys.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogsheetTypeDTO {
	private String title;
	private String description;
	private BigDecimal percentTheory;
	private BigDecimal percentPractical;
	private Boolean topicRequired;
	private Boolean groupRequired;
}