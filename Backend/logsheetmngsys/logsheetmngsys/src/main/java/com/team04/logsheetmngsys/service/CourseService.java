package com.team04.logsheetmngsys.service;

import java.util.List;
import java.util.Optional;

import com.team04.logsheetmngsys.dto.CourseDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseResponseDTO;
import com.team04.logsheetmngsys.entity.Course;

import jakarta.transaction.Transactional;

public interface CourseService {

	Course createCourse(CourseDTO courseDTO);

	CourseResponseDTO getCourseById(Long id);

	List<CourseResponseDTO> getAllCourses();

	CourseResponseDTO updateCourse(Long id, CourseDTO courseDTO);

	void deleteCourse(Long id);

}