package com.team04.logsheetmngsys.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ModuleDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal theoryHours;
    private BigDecimal practicalHours;
}
