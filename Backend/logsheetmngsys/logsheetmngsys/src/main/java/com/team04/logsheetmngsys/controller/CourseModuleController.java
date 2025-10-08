package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.CourseModuleDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseModuleResponseDTO;
import com.team04.logsheetmngsys.entity.CourseModule;
import com.team04.logsheetmngsys.service.CourseModuleService;

@RestController
@RequestMapping("/api/course-modules")
public class CourseModuleController {

    private final CourseModuleService courseModuleService;

    @Autowired
    public CourseModuleController(CourseModuleService courseModuleService) {
        this.courseModuleService = courseModuleService;
    }

    @PostMapping
    public ResponseEntity<List<CourseModuleResponseDTO>> assignModulesToCourse(@RequestBody CourseModuleDTO courseModuleDTO) {
        List<CourseModuleResponseDTO> assignments = courseModuleService.assignModulesToCourse(courseModuleDTO);
        return new ResponseEntity<>(assignments, HttpStatus.CREATED);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseModuleResponseDTO>> getModulesByCourseId(@PathVariable Long courseId) {
        List<CourseModuleResponseDTO> assignments = courseModuleService.getModulesByCourseId(courseId);
        return ResponseEntity.ok(assignments);
    }

    @DeleteMapping("/course/{courseId}/modules")
    public ResponseEntity<String> deleteModulesByCourseId(@PathVariable Long courseId) {
        courseModuleService.deleteModulesByCourseId(courseId);
        return ResponseEntity.ok("All modules removed for course ID: " + courseId);
    }

    @DeleteMapping("/course/{courseId}/modules/{moduleId}")
    public ResponseEntity<String> deleteModuleForCourse(@PathVariable Long courseId, @PathVariable Long moduleId) {
        courseModuleService.deleteModuleForCourse(courseId, moduleId);
        return ResponseEntity.ok("Module ID " + moduleId + " removed from course ID " + courseId);
    }
}