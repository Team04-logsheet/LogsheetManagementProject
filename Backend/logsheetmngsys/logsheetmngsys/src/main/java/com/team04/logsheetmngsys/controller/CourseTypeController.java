package com.team04.logsheetmngsys.controller;

import java.util.List;

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
import org.springframework.web.server.ResponseStatusException;

import com.team04.logsheetmngsys.dto.CourseTypeDTO;
import com.team04.logsheetmngsys.entity.CourseType;
import com.team04.logsheetmngsys.service.CourseTypeService;

@RestController
@RequestMapping("/api/course-types")
public class CourseTypeController {

	private final CourseTypeService courseTypeService;

	@Autowired
	public CourseTypeController(CourseTypeService courseTypeService) {
		this.courseTypeService = courseTypeService;
	}

	@PostMapping
	public ResponseEntity<CourseType> createCourseType(@RequestBody CourseTypeDTO courseTypeDTO) {
		CourseType createdCourseType = courseTypeService.createCourseType(courseTypeDTO);
		return new ResponseEntity<>(createdCourseType, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<CourseType>>getAllCourseType(){
		List<CourseType> courseTypes = courseTypeService.getAllCourseTypes();
		return new ResponseEntity<>(courseTypes,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CourseType> getCourseTypeById(@PathVariable Long id){
		CourseType courseType = courseTypeService.getCourseTypeById(id);
		return new ResponseEntity<>(courseType, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CourseType> updateCourseType(@PathVariable Long id,
			@RequestBody CourseTypeDTO courseTypeDTO) {
		CourseType updateCourseType = courseTypeService.updateCourseType(id, courseTypeDTO);
		return new ResponseEntity<>(updateCourseType, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCourseType(@PathVariable Long id) {
			courseTypeService.deleteCourseType(id);
			return new ResponseEntity<>("CourseType deleted successfully.", HttpStatus.OK);
	}
}