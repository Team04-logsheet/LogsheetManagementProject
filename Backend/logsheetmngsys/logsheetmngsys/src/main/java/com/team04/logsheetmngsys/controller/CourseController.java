package com.team04.logsheetmngsys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.CourseDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseResponseDTO;
import com.team04.logsheetmngsys.entity.Course;
import com.team04.logsheetmngsys.service.CourseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

	private final CourseService courseService;

	@Autowired
	public CourseController(CourseService courseService) {
		this.courseService = courseService;
	}

	@PostMapping
	public ResponseEntity<Course> createCourse(@Valid @RequestBody CourseDTO courseDTO) {
			Course createdCourse = courseService.createCourse(courseDTO);
			return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> getCourseById(@PathVariable Long id) {
        CourseResponseDTO courseDTO = courseService.getCourseById(id);
        return new ResponseEntity<>(courseDTO, HttpStatus.OK);
    }

	@GetMapping
    public ResponseEntity<List<CourseResponseDTO>> getAllCourses() {
        List<CourseResponseDTO> courses = courseService.getAllCourses();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

	@PutMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseDTO courseDTO) {

            CourseResponseDTO updatedCourseDTO = courseService.updateCourse(id, courseDTO);
            return new ResponseEntity<>(updatedCourseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {

            courseService.deleteCourse(id);
            return new ResponseEntity<>("Course deleted successfully.", HttpStatus.OK);
    }

}
