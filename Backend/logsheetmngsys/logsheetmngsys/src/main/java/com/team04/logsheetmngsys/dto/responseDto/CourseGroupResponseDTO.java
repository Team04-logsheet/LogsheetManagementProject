package com.team04.logsheetmngsys.dto.responseDto;

import com.team04.logsheetmngsys.dto.GroupTableDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseGroupResponseDTO {
    private Long id;            
    private Long courseId;      
    private GroupTableDTO group; 
}
