package com.team04.logsheetmngsys.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.team04.logsheetmngsys.dto.ModuleRouterDTO;
import com.team04.logsheetmngsys.dto.responseDto.ModuleRouterResponseDTO;
import com.team04.logsheetmngsys.service.ModuleRouterService;

@RestController
@RequestMapping("/api/module-routers")
public class ModuleRouterController {

    private final ModuleRouterService moduleRouterService;

    public ModuleRouterController(ModuleRouterService moduleRouterService) {
        this.moduleRouterService = moduleRouterService;
    }

    @PostMapping
    public ResponseEntity<ModuleRouterResponseDTO> assignRouter(@RequestBody ModuleRouterDTO dto) {
        return ResponseEntity.ok(moduleRouterService.assignRouterToModule(dto));
    }

    @GetMapping
    public ResponseEntity<List<ModuleRouterResponseDTO>> getAllRouters() {
        return ResponseEntity.ok(moduleRouterService.getAllModuleRouters());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<ModuleRouterResponseDTO>> getActiveRouters() {
        return ResponseEntity.ok(moduleRouterService.getActiveModuleRouters());
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<ModuleRouterResponseDTO>> getByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(moduleRouterService.getRoutersByModuleId(moduleId));
    }

    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<ModuleRouterResponseDTO>> getByStaff(@PathVariable Long staffId) {
        return ResponseEntity.ok(moduleRouterService.getRoutersByStaffId(staffId));
    }

    @PutMapping("/deactivate")
    public ResponseEntity<ModuleRouterResponseDTO> deactivateRouter(@RequestBody ModuleRouterDTO dto) {
        return ResponseEntity.ok(moduleRouterService.deactivateRouter(dto.getModuleId(), dto.getStaffId()));
    }

    @DeleteMapping("/module/{moduleId}")
    public ResponseEntity<String> deleteByModule(@PathVariable Long moduleId) {
        String responseMsg = moduleRouterService.deleteRoutersByModuleId(moduleId);
        return ResponseEntity.ok(responseMsg);
    }

    @DeleteMapping("/module/{moduleId}/staff/{staffId}")
    public ResponseEntity<String> deleteByModuleAndStaff(@PathVariable Long moduleId, @PathVariable Long staffId) {
        String responseMsg = moduleRouterService.deleteRouter(moduleId, staffId);
        return ResponseEntity.ok(responseMsg);
    }
    
    @DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id) {
		String responseMsg = moduleRouterService.deleteModuleRouterById(id);
		return ResponseEntity.ok(responseMsg);
	}
    
    @GetMapping("/is-active/staff/{staffId}")
    public ResponseEntity<Boolean> isStaffAnActiveRouter(@PathVariable Long staffId) {
        boolean isActive = moduleRouterService.isStaffAnActiveRouter(staffId);
        return ResponseEntity.ok(isActive);
    }
}