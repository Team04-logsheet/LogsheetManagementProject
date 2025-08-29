package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.SubjectDTO;
import com.team04.logsheetmngsys.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    private final SubjectService service;

    public SubjectController(SubjectService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<SubjectDTO> createSubject(@RequestBody SubjectDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createSubject(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SubjectDTO> updateSubject(@PathVariable Long id, @RequestBody SubjectDTO dto) {
        return ResponseEntity.ok(service.updateSubject(id, dto));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SubjectDTO> getSubject(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSubjectById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
        return ResponseEntity.ok(service.getAllSubjects());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        service.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}
