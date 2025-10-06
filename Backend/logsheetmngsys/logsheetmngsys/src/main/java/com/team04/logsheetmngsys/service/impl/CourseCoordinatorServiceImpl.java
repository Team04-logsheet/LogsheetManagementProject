package com.team04.logsheetmngsys.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.dto.CourseCoordinatorDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseCoordinatorResponseDTO;
import com.team04.logsheetmngsys.entity.Course;
import com.team04.logsheetmngsys.entity.CourseCoordinator;
import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.repository.CourseCoordinatorRepository;
import com.team04.logsheetmngsys.repository.CourseRepository;
import com.team04.logsheetmngsys.repository.StaffRepository;
import com.team04.logsheetmngsys.service.CourseCoordinatorService;

import jakarta.transaction.Transactional;

@Service
public class CourseCoordinatorServiceImpl implements CourseCoordinatorService {

	private final CourseCoordinatorRepository courseCoordinatorRepository;
	private final CourseRepository courseRepository;
	private final StaffRepository staffRepository;

	public CourseCoordinatorServiceImpl(CourseCoordinatorRepository courseCoordinatorRepository,
			CourseRepository courseRepository, StaffRepository staffRepository) {
		this.courseCoordinatorRepository = courseCoordinatorRepository;
		this.courseRepository = courseRepository;
		this.staffRepository = staffRepository;
	}
	
	

	@Override
	@Transactional
	public CourseCoordinatorResponseDTO assignCoordinatorToCourse(CourseCoordinatorDTO dto) {
		Course course = courseRepository.findById(dto.getCourseId())
				.orElseThrow(() -> new RuntimeException("Course not found with ID: " + dto.getCourseId()));

		Staff staff = staffRepository.findById(dto.getStaffId())
				.orElseThrow(() -> new RuntimeException("Staff not found with ID: " + dto.getStaffId()));

		CourseCoordinator coordinator = new CourseCoordinator();
		coordinator.setCourse(course);
		coordinator.setStaff(staff);
		coordinator.setIsActive(true); // default
		
	    CourseCoordinator saved = courseCoordinatorRepository.save(coordinator);

	    CourseCoordinatorResponseDTO courseCoordinatorResponseDTO = mapToDto(saved);
	     
	    return courseCoordinatorResponseDTO;
	}

	@Override
	public List<CourseCoordinatorResponseDTO> getAllCourseCoordinators() {
		return courseCoordinatorRepository.findAll()
	            .stream()
	            .map(this::mapToDto)
	            .toList(); 
	}

	@Override
	public List<CourseCoordinatorResponseDTO> getCoordinatorsByCourseId(Long courseId) {
		 return courseCoordinatorRepository.findByCourseId(courseId)
		            .stream()
		            .map(this::mapToDto)
		            .toList();
	}

	@Override
	public List<CourseCoordinatorResponseDTO> getCoordinatorsByStaffId(Long staffId) {
		return courseCoordinatorRepository.findByStaffId(staffId)
	            .stream()
	            .map(this::mapToDto)
	            .toList();	}

	@Override
	public String deleteCoordinatorsByCourseId(Long courseId) {
		courseCoordinatorRepository.deleteByCourseId(courseId);
	    return "All coordinators for course ID " + courseId + " have been deleted.";
	}

	@Override
	public String deleteCoordinator(Long courseId, Long staffId) {
	    return courseCoordinatorRepository.findByCourseIdAndStaffId(courseId, staffId)
	            .map(coordinator -> {
	                courseCoordinatorRepository.delete(coordinator);
	                return "Coordinator for course ID " + courseId + " and staff ID " + staffId + " has been deleted.";
	            })
	            .orElse("No coordinator found for course ID " + courseId + " and staff ID " + staffId);
	}

	@Override
	public String deleteCourseCoordinatorById(Long id) {
		if (!courseCoordinatorRepository.existsById(id)) {
			throw new RuntimeException("CourseCoordinator not found with ID: " + id);
		}
		courseCoordinatorRepository.deleteById(id);
	    return "CourseCoordinator with ID " + id + " has been deleted.";

	}
	
	@Override
	@Transactional
	public CourseCoordinatorResponseDTO deactivateCoordinator(Long courseId, Long staffId) {
	    CourseCoordinator coordinator = courseCoordinatorRepository
	            .findByCourseIdAndStaffId(courseId, staffId)
	            .orElseThrow(() -> new RuntimeException(
	                    "CourseCoordinator not found with Course ID: " + courseId + " and Staff ID: " + staffId));

	    coordinator.setIsActive(false); // deactivate

	    return mapToDto(courseCoordinatorRepository.save(coordinator));	
	}
	
	
	private CourseCoordinatorResponseDTO mapToDto(CourseCoordinator entity) {
	    return new CourseCoordinatorResponseDTO(
	        entity.getId(),
	        entity.getCourse().getId(),
	        entity.getCourse().getName(),
	        entity.getStaff().getId(),
	        entity.getStaff().getFirstName(),
	        entity.getIsActive()
	    );
	}
	
}