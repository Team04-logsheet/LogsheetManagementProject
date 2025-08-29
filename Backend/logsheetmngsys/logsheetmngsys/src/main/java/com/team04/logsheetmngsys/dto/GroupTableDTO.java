package com.team04.logsheetmngsys.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupTableDTO {
    private Long id;
    private String name;
    private String description;
}