package com.team04.logsheetmngsys.service;

import java.util.List;
import java.util.Optional;

import com.team04.logsheetmngsys.dto.CourseTypeDTO;
import com.team04.logsheetmngsys.entity.CourseType;

public interface CourseTypeService {

	CourseType createCourseType(CourseTypeDTO courseTypeDTO);

	List<CourseType> getAllCourseTypes();

	CourseType getCourseTypeById(Long id);

	CourseType updateCourseType(Long id, CourseTypeDTO courseTypeDTO);

	void deleteCourseType(Long id);
}
