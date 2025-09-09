package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.CourseGroupDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseGroupResponseDTO;

public interface CourseGroupService {
	List<CourseGroupResponseDTO> assignGroupToCourse(CourseGroupDTO dto);
	
	List<CourseGroupResponseDTO> getAllCourseGroups();
	
	List<CourseGroupResponseDTO> getGroupsByCourseId(Long id);
	
	void deleteGroupsByCourseId(Long courseId);
	
	void deleteGroupForCourse(Long courseId, Long groupId);
    	
	void deleteCourseGroup(Long id);
}