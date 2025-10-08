package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.CourseModuleDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseModuleResponseDTO;

public interface CourseModuleService {

    List<CourseModuleResponseDTO> assignModulesToCourse(CourseModuleDTO courseModuleDTO);

    List<CourseModuleResponseDTO> getAllCourseModules();

    List<CourseModuleResponseDTO> getModulesByCourseId(Long courseId);

    void deleteModulesByCourseId(Long courseId);
    
    void deleteModuleForCourse(Long courseId, Long moduleId);
    
    void deleteCourseModuleById(Long id);
}