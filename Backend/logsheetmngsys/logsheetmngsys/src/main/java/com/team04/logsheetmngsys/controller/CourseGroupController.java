package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.CourseGroupDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseGroupResponseDTO;
import com.team04.logsheetmngsys.service.CourseGroupService;

@RestController
@RequestMapping("/api/course-groups")
public class CourseGroupController {

	private final CourseGroupService courseGroupService;

	public CourseGroupController(CourseGroupService courseGroupService) {
		this.courseGroupService = courseGroupService;
	}

	@PostMapping()
	public ResponseEntity<List<CourseGroupResponseDTO>> createCourseGroup(@RequestBody CourseGroupDTO dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(courseGroupService.assignGroupToCourse(dto));
	}

	@GetMapping()
	public ResponseEntity<List<CourseGroupResponseDTO>> getAllCourseGroups() {
		return ResponseEntity.ok(courseGroupService.getAllCourseGroups());
	}

	@GetMapping("/course/{id}")
	public ResponseEntity<List<CourseGroupResponseDTO>> getGroupsByCourseId(@PathVariable Long id) {
		return ResponseEntity.ok(courseGroupService.getGroupsByCourseId(id));
	}

	@DeleteMapping("/course/{courseId}/groups")
	public ResponseEntity<String> deleteGroupsByCourse(@PathVariable Long courseId) {
		courseGroupService.deleteGroupsByCourseId(courseId);
		return ResponseEntity.ok("All Groups removed for Course ID: " + courseId);
	}

	@DeleteMapping("/course/{courseId}/groups/{groupId}")
	public ResponseEntity<String> deleteGroupForCourse(@PathVariable Long courseId, @PathVariable Long groupId) {

		courseGroupService.deleteGroupForCourse(courseId, groupId);
		return ResponseEntity.ok("Group ID " + groupId + " removed from Course ID " + courseId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCourseGroup(@PathVariable Long id) {
		courseGroupService.deleteCourseGroup(id);
		return ResponseEntity.ok("CourseGroup with ID " + id + " deleted successfully.");
	}

}