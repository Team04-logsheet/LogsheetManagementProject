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

import com.team04.logsheetmngsys.dto.ModuleDTO;
import com.team04.logsheetmngsys.service.ModuleService;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping
    public ResponseEntity<ModuleDTO> createModule(@RequestBody ModuleDTO moduleDTO) {
        ModuleDTO createdModule = moduleService.createModule(moduleDTO);
        return new ResponseEntity<>(createdModule, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ModuleDTO>> getAllModules() {
        List<ModuleDTO> modules = moduleService.getAllModules();
        return new ResponseEntity<>(modules, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleDTO> getModuleById(@PathVariable Long id) {
    	ModuleDTO module = moduleService.getModuleById(id);
        return new ResponseEntity<>(module, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuleDTO> updateModule(@PathVariable Long id, @RequestBody ModuleDTO moduleDTO) {
    	ModuleDTO updatedModule = moduleService.updateModule(id, moduleDTO);
        return new ResponseEntity<>(updatedModule, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteModule(@PathVariable Long id) {
        moduleService.deleteModule(id);
        return new ResponseEntity<>("Module deleted successfully.", HttpStatus.OK);
    }
}
