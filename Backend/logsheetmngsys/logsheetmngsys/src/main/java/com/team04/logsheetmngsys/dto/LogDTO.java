package com.team04.logsheetmngsys.dto;

import lombok.Data;

@Data
public class LogDTO {

    private Long staffId;

    private Long logsheetTypeId;

    private Long courseId;

    private Long moduleId;

    private Long topicId;

    private String extraTopicsCovered;

    private String taskAssignGiven;

    private String description;
    
    private Boolean isVerified;

    private Boolean isApproved;
}