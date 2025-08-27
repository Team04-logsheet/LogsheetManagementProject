package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.dto.CourseDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseResponseDTO;
import com.team04.logsheetmngsys.entity.BatchCycle;
import com.team04.logsheetmngsys.entity.Course;
import com.team04.logsheetmngsys.entity.CourseType;
import com.team04.logsheetmngsys.entity.Premise;
import com.team04.logsheetmngsys.repository.BatchCycleRepository;
import com.team04.logsheetmngsys.repository.CourseRepository;
import com.team04.logsheetmngsys.repository.CourseTypeRepository;
import com.team04.logsheetmngsys.repository.PremiseRepository;
import com.team04.logsheetmngsys.service.CourseService;

import jakarta.transaction.Transactional;

@Service
public class CourseServiceImpl implements CourseService {

	private final CourseRepository courseRepository;
	private final BatchCycleRepository batchCycleRepository;
	private final PremiseRepository premiseRepository;
	private final CourseTypeRepository courseTypeRepository;

	@Autowired
	public CourseServiceImpl(CourseRepository courseRepository, BatchCycleRepository batchCycleRepository,
			PremiseRepository premiseRepository, CourseTypeRepository courseTypeRepository) {
		this.courseRepository = courseRepository;
		this.batchCycleRepository = batchCycleRepository;
		this.premiseRepository = premiseRepository;
		this.courseTypeRepository = courseTypeRepository;
	}

	@Override
	@Transactional
	public Course createCourse(CourseDTO courseDTO) {

		BatchCycle batchCycle = batchCycleRepository.findById(courseDTO.getBatchCycleId()).orElseThrow(
				() -> new IllegalArgumentException("Batch Cycle not found with ID: " + courseDTO.getBatchCycleId()));

		Premise premise = premiseRepository.findById(courseDTO.getPremiseId()).orElseThrow(
				() -> new IllegalArgumentException("Premise not found with ID: " + courseDTO.getPremiseId()));

		CourseType courseType = courseTypeRepository.findById(courseDTO.getCourseTypeId()).orElseThrow(
				() -> new IllegalArgumentException("Course Type not found with ID: " + courseDTO.getCourseTypeId()));

		Course course = new Course();
		course.setName(courseDTO.getName());
		course.setDescription(courseDTO.getDescription());
		course.setStartDate(courseDTO.getStartDate());
		course.setEndDate(courseDTO.getEndDate());
		course.setBatchCycle(batchCycle);
		course.setPremise(premise);
		course.setCourseType(courseType);

		return courseRepository.save(course);
	}

	// Converts a Course entity to a CourseResponseDto. This helper method ensures
	// lazy-loaded data is accessed within the session.

	private CourseResponseDTO convertToDTO(Course course) {
		CourseResponseDTO courseResponseDTO = new CourseResponseDTO();
		courseResponseDTO.setId(course.getId());
		courseResponseDTO.setName(course.getName());
		courseResponseDTO.setDescription(course.getDescription());
		courseResponseDTO.setStartDate(course.getStartDate());
		courseResponseDTO.setEndDate(course.getEndDate());

		// Accessing lazy-loaded entities *within* the service method (inside the
		// transaction/session)
		if (course.getBatchCycle() != null) {
			courseResponseDTO.setBatchCycleId(course.getBatchCycle().getId());
			courseResponseDTO.setBatchCycleTitle(course.getBatchCycle().getTitle()); // Accessing title from proxy
		}
		if (course.getPremise() != null) {
			courseResponseDTO.setPremiseId(course.getPremise().getId());
			courseResponseDTO.setPremiseTitle(course.getPremise().getTitle()); // Accessing title from proxy
		}
		if (course.getCourseType() != null) {
			courseResponseDTO.setCourseTypeId(course.getCourseType().getId());
			courseResponseDTO.setCourseTypeTitle(course.getCourseType().getTitle()); // Accessing title from proxy
		}
		return courseResponseDTO;
	}

	@Override
	@Transactional
	public Optional<CourseResponseDTO> getCourseById(Long id) {
		return courseRepository.findById(id).map(course -> this.convertToDTO(course));// .map(this::convertToDto);
		// Convert entity to DTO if found
	}

	@Override
	@Transactional
	public List<CourseResponseDTO> getAllCourses() {
		return courseRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public CourseResponseDTO updateCourse(Long id, CourseDTO courseDTO) {

		Course existingCourse = courseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Course not found with ID: " + id));

		existingCourse.setName(courseDTO.getName());
		existingCourse.setDescription(courseDTO.getDescription());
		existingCourse.setStartDate(courseDTO.getStartDate());
		existingCourse.setEndDate(courseDTO.getEndDate());

//		IF (a new BatchCycleId was provided in the update request)
//		AND
//		( EITHER the existingCourse is currently not linked to any BatchCycle
//		OR the BatchCycleId provided in the request is different from the BatchCycleId already linked to the existingCourse )
//
//		"THEN (and only then): go find the new BatchCycle in the database, make sure it exists, and then update the existingCourse to be linked to this new BatchCycle."

		if (courseDTO.getBatchCycleId() != null && (existingCourse.getBatchCycle() == null
				|| !existingCourse.getBatchCycle().getId().equals(courseDTO.getBatchCycleId()))) {
			BatchCycle batchCycle = batchCycleRepository.findById(courseDTO.getBatchCycleId())
					.orElseThrow(() -> new IllegalArgumentException(
							"Batch Cycle not found with ID: " + courseDTO.getBatchCycleId()));
			existingCourse.setBatchCycle(batchCycle);
		}

		if (courseDTO.getPremiseId() != null && (existingCourse.getPremise() == null
				|| !existingCourse.getPremise().getId().equals(courseDTO.getPremiseId()))) {
			Premise premise = premiseRepository.findById(courseDTO.getPremiseId()).orElseThrow(
					() -> new IllegalArgumentException("Premise not found with ID: " + courseDTO.getPremiseId()));
			existingCourse.setPremise(premise);
		}

		if (courseDTO.getCourseTypeId() != null && (existingCourse.getCourseType() == null
				|| !existingCourse.getCourseType().getId().equals(courseDTO.getCourseTypeId()))) {
			CourseType courseType = courseTypeRepository.findById(courseDTO.getCourseTypeId())
					.orElseThrow(() -> new IllegalArgumentException(
							"Course Type not found with ID: " + courseDTO.getCourseTypeId()));
			existingCourse.setCourseType(courseType);
		}

		Course updatedCourse = courseRepository.save(existingCourse);
		return convertToDTO(updatedCourse);
	}

	@Override
	@Transactional
	public void deleteCourse(Long id) {
		if (!courseRepository.existsById(id)) {
			throw new IllegalArgumentException("Course not found with ID: " + id);
		}
		courseRepository.deleteById(id);
	}

}
