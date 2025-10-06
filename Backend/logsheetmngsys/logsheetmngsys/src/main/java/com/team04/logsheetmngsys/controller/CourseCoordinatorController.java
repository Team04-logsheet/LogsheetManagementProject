package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.CourseCoordinatorDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseCoordinatorResponseDTO;
import com.team04.logsheetmngsys.service.CourseCoordinatorService;

@RestController
@RequestMapping("/api/course-coordinators")
public class CourseCoordinatorController {

	private final CourseCoordinatorService courseCoordinatorService;

	public CourseCoordinatorController(CourseCoordinatorService courseCoordinatorService) {
		this.courseCoordinatorService = courseCoordinatorService;
	}

	@PostMapping
	public ResponseEntity<CourseCoordinatorResponseDTO> assignCoordinator(@RequestBody CourseCoordinatorDTO dto) {
		return ResponseEntity.ok(courseCoordinatorService.assignCoordinatorToCourse(dto));
	}

	@GetMapping
	public ResponseEntity<List<CourseCoordinatorResponseDTO>> getAllCoordinators() {
		return ResponseEntity.ok(courseCoordinatorService.getAllCourseCoordinators());
	}

	@GetMapping("/course/{courseId}")
	public ResponseEntity<List<CourseCoordinatorResponseDTO>> getByCourse(@PathVariable Long courseId) {
		return ResponseEntity.ok(courseCoordinatorService.getCoordinatorsByCourseId(courseId));
	}

	@GetMapping("/staff/{staffId}")
	public ResponseEntity<List<CourseCoordinatorResponseDTO>> getByStaff(@PathVariable Long staffId) {
		return ResponseEntity.ok(courseCoordinatorService.getCoordinatorsByStaffId(staffId));
	}

	@PutMapping("/deactivate")
	public ResponseEntity<CourseCoordinatorResponseDTO> deactivateCoordinator(@RequestBody CourseCoordinatorDTO dto) {
		return ResponseEntity.ok(courseCoordinatorService.deactivateCoordinator(dto.getCourseId(), dto.getStaffId()));
	}

	@DeleteMapping("/course/{courseId}")
	public ResponseEntity<String> deleteByCourse(@PathVariable Long courseId) {
		String responseMsg = courseCoordinatorService.deleteCoordinatorsByCourseId(courseId);
		return ResponseEntity.ok(responseMsg);
	}

	@DeleteMapping("/course/{courseId}/staff/{staffId}")
	public ResponseEntity<String> deleteByCourseAndStaff(@PathVariable Long courseId, @PathVariable Long staffId) {
		String responseMsg = courseCoordinatorService.deleteCoordinator(courseId, staffId);
		return ResponseEntity.ok(responseMsg);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id) {
		String responseMsg = courseCoordinatorService.deleteCourseCoordinatorById(id);
		return ResponseEntity.ok(responseMsg);
	}
}

