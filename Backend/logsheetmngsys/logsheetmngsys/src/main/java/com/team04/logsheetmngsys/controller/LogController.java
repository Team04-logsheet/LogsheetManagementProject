package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.LogDTO;
import com.team04.logsheetmngsys.dto.responseDto.LogResponseDTO;
import com.team04.logsheetmngsys.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    @Autowired
    private LogService logService;

    @PostMapping
    public ResponseEntity<LogResponseDTO> createLog(@RequestBody LogDTO logDTO) {
        LogResponseDTO response = logService.createLog(logDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<LogResponseDTO>> getAllLogs() {
        List<LogResponseDTO> response = logService.getAllLogs();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogResponseDTO> getLogById(@PathVariable Long id) {
        LogResponseDTO response = logService.getLogById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LogResponseDTO> updateLog(@PathVariable Long id, @RequestBody LogDTO logDTO) {
        LogResponseDTO response = logService.updateLog(id, logDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLog(@PathVariable Long id) {
        logService.deleteLog(id);
        return ResponseEntity.ok("Log deleted successfully with ID: " + id);
    }
    
    @PatchMapping("/{id}/verify")
    public ResponseEntity<LogResponseDTO> verifyLog(@PathVariable Long id) {
        LogResponseDTO response = logService.verifyLog(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<LogResponseDTO> approveLog(@PathVariable Long id) {
        LogResponseDTO response = logService.approveLog(id);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/by-staff/{staffId}")
    public ResponseEntity<List<LogResponseDTO>> getLogsByStaff(@PathVariable Long staffId) {
        List<LogResponseDTO> response = logService.getLogsByStaffId(staffId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<List<LogResponseDTO>> getLogsByCourse(@PathVariable Long courseId) {
        List<LogResponseDTO> response = logService.getLogsByCourseId(courseId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-logsheet-type/{logsheetTypeId}")
    public ResponseEntity<List<LogResponseDTO>> getLogsByLogsheetType(@PathVariable Long logsheetTypeId) {
        List<LogResponseDTO> response = logService.getLogsByLogsheetTypeId(logsheetTypeId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-module/{moduleId}")
    public ResponseEntity<List<LogResponseDTO>> getLogsByModule(@PathVariable Long moduleId) {
        List<LogResponseDTO> response = logService.getLogsByModuleId(moduleId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-topic/{topicId}")
    public ResponseEntity<List<LogResponseDTO>> getLogsByTopic(@PathVariable Long topicId) {
        List<LogResponseDTO> response = logService.getLogsByTopicId(topicId);
        return ResponseEntity.ok(response);
    }
}
