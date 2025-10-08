package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.ModuleSubjectDTO;
import com.team04.logsheetmngsys.dto.responseDto.ModuleSubjectResponseDTO;
import com.team04.logsheetmngsys.service.ModuleSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/module-subjects")
public class ModuleSubjectController {

    private final ModuleSubjectService moduleSubjectService;

    @Autowired
    public ModuleSubjectController(ModuleSubjectService moduleSubjectService) {
        this.moduleSubjectService = moduleSubjectService;
    }

    @GetMapping
    public ResponseEntity<List<ModuleSubjectResponseDTO>> getAllModuleSubjects() {
        List<ModuleSubjectResponseDTO> assignments = moduleSubjectService.getAllModuleSubjects();
        return ResponseEntity.ok(assignments);
    }
    
    @PostMapping
    public ResponseEntity<List<ModuleSubjectResponseDTO>> assignSubjectsToModule(@RequestBody ModuleSubjectDTO moduleSubjectDTO) {
        List<ModuleSubjectResponseDTO> assignments = moduleSubjectService.assignSubjectsToModule(moduleSubjectDTO);
        return new ResponseEntity<>(assignments, HttpStatus.CREATED);
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<ModuleSubjectResponseDTO>> getSubjectsByModuleId(@PathVariable Long moduleId) {
        List<ModuleSubjectResponseDTO> assignments = moduleSubjectService.getSubjectsByModuleId(moduleId);
        return ResponseEntity.ok(assignments);
    }

    @DeleteMapping("/module/{moduleId}/subjects")
    public ResponseEntity<String> deleteSubjectsByModuleId(@PathVariable Long moduleId) {
        moduleSubjectService.deleteSubjectsByModuleId(moduleId);
        return ResponseEntity.ok("All subjects removed for module ID: " + moduleId);
    }

    @DeleteMapping("/module/{moduleId}/subjects/{subjectId}")
    public ResponseEntity<String> deleteSubjectForModule(@PathVariable Long moduleId, @PathVariable Long subjectId) {
        moduleSubjectService.deleteSubjectForModule(moduleId, subjectId);
        return ResponseEntity.ok("Subject ID " + subjectId + " removed from module ID " + moduleId);
    }
}