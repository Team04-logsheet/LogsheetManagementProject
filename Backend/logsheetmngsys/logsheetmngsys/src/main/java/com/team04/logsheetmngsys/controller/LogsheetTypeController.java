package com.team04.logsheetmngsys.controller;

import java.util.List;

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

import com.team04.logsheetmngsys.dto.LogsheetTypeDTO;
import com.team04.logsheetmngsys.entity.LogsheetType;
import com.team04.logsheetmngsys.service.LogsheetTypeService;

@RestController
@RequestMapping("/api/logsheet-types")
public class LogsheetTypeController {

    private final LogsheetTypeService logsheetTypeService;

    public LogsheetTypeController(LogsheetTypeService logsheetTypeService) {
        this.logsheetTypeService = logsheetTypeService;
    }

    @PostMapping
    public ResponseEntity<LogsheetType> createLogsheetType(@RequestBody LogsheetTypeDTO dto) {
        LogsheetType created = logsheetTypeService.createLogsheetType(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LogsheetType>> getAllLogsheetTypes() {
        return new ResponseEntity<>(logsheetTypeService.getAllLogsheetTypes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogsheetType> getLogsheetTypeById(@PathVariable Long id) {
        return new ResponseEntity<>(logsheetTypeService.getLogsheetTypeById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LogsheetType> updateLogsheetType(@PathVariable Long id, @RequestBody LogsheetTypeDTO dto) {
        return new ResponseEntity<>(logsheetTypeService.updateLogsheetType(id, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLogsheetType(@PathVariable Long id) {
        logsheetTypeService.deleteLogsheetType(id);
        return ResponseEntity.ok("LogsheetType deleted successfully");
    }
}