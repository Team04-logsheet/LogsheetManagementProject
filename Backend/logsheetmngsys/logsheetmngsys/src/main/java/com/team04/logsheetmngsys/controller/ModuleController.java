package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.ModuleDTO;
import com.team04.logsheetmngsys.service.ModuleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/modules")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping("/create")
    public ModuleDTO createModule(@RequestBody ModuleDTO dto) {
        return moduleService.createModule(dto);
    }

    @GetMapping("/{id}")
    public ModuleDTO getModuleById(@PathVariable Long id) {
        return moduleService.getModuleById(id);
    }

    @GetMapping("/all")
    public List<ModuleDTO> getAllModules() {
        return moduleService.getAllModules();
    }

    @PutMapping("/update/{id}")
    public ModuleDTO updateModule(@PathVariable Long id, @RequestBody ModuleDTO dto) {
        return moduleService.updateModule(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteModule(@PathVariable Long id) {
        moduleService.deleteModule(id);
    }
}
