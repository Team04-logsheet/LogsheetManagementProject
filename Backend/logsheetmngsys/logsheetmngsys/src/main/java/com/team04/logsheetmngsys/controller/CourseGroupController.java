package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.CourseGroupDTO;
import com.team04.logsheetmngsys.service.CourseGroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course-groups")
public class CourseGroupController {

    private final CourseGroupService service;

    public CourseGroupController(CourseGroupService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<CourseGroupDTO> createCourseGroup(@RequestBody CourseGroupDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createCourseGroup(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CourseGroupDTO> updateCourseGroup(@PathVariable Long id, @RequestBody CourseGroupDTO dto) {
        return ResponseEntity.ok(service.updateCourseGroup(id, dto));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CourseGroupDTO> getCourseGroup(@PathVariable Long id) {
        return ResponseEntity.ok(service.getCourseGroupById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CourseGroupDTO>> getAllCourseGroups() {
        return ResponseEntity.ok(service.getAllCourseGroups());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourseGroup(@PathVariable Long id) {
        service.deleteCourseGroup(id);
        return ResponseEntity.noContent().build();
    }
}