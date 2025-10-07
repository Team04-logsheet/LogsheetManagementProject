package com.team04.logsheetmngsys.dto.responseDto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LogResponseDTO {

    private Long id;

    private Long staffId;
    private String staffName; 

    private Long logsheetTypeId; 
    private String logsheetTypeTitle;

    private Long courseId;
    private String courseName;

   
    private Long moduleId;
    private String moduleTitle;

    private Long topicId;
    private String topicName;
    
    private String extraTopicsCovered;
    private String taskAssignGiven;
    private String description;
    
    private Boolean isVerified;
    private Boolean isApproved;
    private LocalDateTime approvedAt;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}