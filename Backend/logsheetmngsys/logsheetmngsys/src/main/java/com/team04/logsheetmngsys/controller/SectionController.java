package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.SectionDTO;
import com.team04.logsheetmngsys.service.SectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sections")
public class SectionController {

    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping("/create")
    public ResponseEntity<SectionDTO> createSection(@RequestBody SectionDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sectionService.createSection(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SectionDTO> updateSection(@PathVariable Long id, @RequestBody SectionDTO dto) {
        return ResponseEntity.ok(sectionService.updateSection(id, dto));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SectionDTO> getSection(@PathVariable Long id) {
        return ResponseEntity.ok(sectionService.getSectionById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SectionDTO>> getAllSections() {
        return ResponseEntity.ok(sectionService.getAllSections());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }
}
