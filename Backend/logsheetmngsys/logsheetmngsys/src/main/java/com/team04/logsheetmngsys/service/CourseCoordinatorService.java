package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.CourseCoordinatorDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseCoordinatorResponseDTO;
import com.team04.logsheetmngsys.entity.CourseCoordinator;

public interface CourseCoordinatorService {

	CourseCoordinatorResponseDTO assignCoordinatorToCourse(CourseCoordinatorDTO dto);

	List<CourseCoordinatorResponseDTO> getAllCourseCoordinators();

	List<CourseCoordinatorResponseDTO> getActiveCourseCoordinators();

	List<CourseCoordinatorResponseDTO> getCoordinatorsByCourseId(Long courseId);

	List<CourseCoordinatorResponseDTO> getCoordinatorsByStaffId(Long staffId);

	String deleteCoordinatorsByCourseId(Long courseId);

	String deleteCoordinator(Long courseId, Long staffId);

	String deleteCourseCoordinatorById(Long id);

	CourseCoordinatorResponseDTO deactivateCoordinator(Long courseId, Long staffId);

    boolean isStaffAnActiveCoordinator(Long staffId);
	
}