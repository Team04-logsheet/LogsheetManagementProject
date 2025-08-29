package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.CourseGroupDTO;
import java.util.List;

public interface CourseGroupService {
    CourseGroupDTO createCourseGroup(CourseGroupDTO dto);
    CourseGroupDTO updateCourseGroup(Long id, CourseGroupDTO dto);
    CourseGroupDTO getCourseGroupById(Long id);
    List<CourseGroupDTO> getAllCourseGroups();
    void deleteCourseGroup(Long id);
}