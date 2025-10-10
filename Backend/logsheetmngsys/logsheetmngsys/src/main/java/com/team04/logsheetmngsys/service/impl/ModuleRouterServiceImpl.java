package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.team04.logsheetmngsys.dto.ModuleRouterDTO;
import com.team04.logsheetmngsys.dto.responseDto.ModuleRouterResponseDTO;
import com.team04.logsheetmngsys.entity.Module;
import com.team04.logsheetmngsys.entity.ModuleRouter;
import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.repository.ModuleRepository;
import com.team04.logsheetmngsys.repository.ModuleRouterRepository;
import com.team04.logsheetmngsys.repository.StaffRepository;
import com.team04.logsheetmngsys.service.ModuleRouterService;
import jakarta.transaction.Transactional;

@Service
public class ModuleRouterServiceImpl implements ModuleRouterService {

    private final ModuleRouterRepository moduleRouterRepository;
    private final ModuleRepository moduleRepository; // Assuming you have this repository
    private final StaffRepository staffRepository;

    public ModuleRouterServiceImpl(ModuleRouterRepository moduleRouterRepository, 
                                   ModuleRepository moduleRepository, 
                                   StaffRepository staffRepository) {
        this.moduleRouterRepository = moduleRouterRepository;
        this.moduleRepository = moduleRepository;
        this.staffRepository = staffRepository;
    }

    @Override
    @Transactional
    public ModuleRouterResponseDTO assignRouterToModule(ModuleRouterDTO dto) {
        Module module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found with ID: " + dto.getModuleId()));

        Staff staff = staffRepository.findById(dto.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + dto.getStaffId()));

        ModuleRouter router = new ModuleRouter();
        router.setModule(module);
        router.setStaff(staff);
        router.setIsActive(true); // default to active

        ModuleRouter saved = moduleRouterRepository.save(router);
        return mapToDto(saved);
    }

    @Override
    public List<ModuleRouterResponseDTO> getAllModuleRouters() {
        return moduleRouterRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<ModuleRouterResponseDTO> getRoutersByModuleId(Long moduleId) {
        return moduleRouterRepository.findByModuleId(moduleId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public List<ModuleRouterResponseDTO> getRoutersByStaffId(Long staffId) {
        return moduleRouterRepository.findByStaffId(staffId)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public String deleteRoutersByModuleId(Long moduleId) {
        moduleRouterRepository.deleteByModuleId(moduleId);
        return "All routers for module ID " + moduleId + " have been deleted.";
    }

    @Override
    public String deleteRouter(Long moduleId, Long staffId) {
        return moduleRouterRepository.findByModuleIdAndStaffId(moduleId, staffId)
                .map(router -> {
                    moduleRouterRepository.delete(router);
                    return "Router for module ID " + moduleId + " and staff ID " + staffId + " has been deleted.";
                })
                .orElse("No router found for module ID " + moduleId + " and staff ID " + staffId);
    }
    
    @Override
	public String deleteModuleRouterById(Long id) {
		if (!moduleRouterRepository.existsById(id)) {
			throw new RuntimeException("ModuleRouter not found with ID: " + id);
		}
		moduleRouterRepository.deleteById(id);
	    return "ModuleRouter with ID " + id + " has been deleted.";
	}

    @Override
    @Transactional
    public ModuleRouterResponseDTO deactivateRouter(Long moduleId, Long staffId) {
        ModuleRouter router = moduleRouterRepository
                .findByModuleIdAndStaffId(moduleId, staffId)
                .orElseThrow(() -> new RuntimeException(
                        "ModuleRouter not found with Module ID: " + moduleId + " and Staff ID: " + staffId));

        router.setIsActive(false); // deactivate
        return mapToDto(moduleRouterRepository.save(router));
    }
    
    @Override
    public boolean isStaffAnActiveRouter(Long staffId) {
        return moduleRouterRepository.existsByStaffIdAndIsActiveTrue(staffId);
    }
    
    @Override
    public List<ModuleRouterResponseDTO> getActiveModuleRouters() {
        return moduleRouterRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private ModuleRouterResponseDTO mapToDto(ModuleRouter entity) {
        return new ModuleRouterResponseDTO(
                entity.getId(),
                entity.getModule().getId(),
                entity.getModule().getTitle(), 
                entity.getStaff().getId(),
                entity.getStaff().getFirstName(), 
                entity.getIsActive()
        );
    }
}