package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.dto.ModuleDTO;
import com.team04.logsheetmngsys.entity.Module;
import com.team04.logsheetmngsys.repository.ModuleRepository;
import com.team04.logsheetmngsys.service.ModuleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepo;

    public ModuleServiceImpl(ModuleRepository moduleRepo) {
        this.moduleRepo = moduleRepo;
    }

    @Override
    public ModuleDTO createModule(ModuleDTO dto) {
        Module module = new Module();
        module.setTitle(dto.getTitle());
        module.setDescription(dto.getDescription());
        module.setTheoryHours(dto.getTheoryHours());
        module.setPracticalHours(dto.getPracticalHours());

        Module saved = moduleRepo.save(module);

        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public ModuleDTO getModuleById(Long id) {
        Module module = moduleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        return mapToDTO(module);
    }

    @Override
    public List<ModuleDTO> getAllModules() {
        return moduleRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ModuleDTO updateModule(Long id, ModuleDTO dto) {
        Module module = moduleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        module.setTitle(dto.getTitle());
        module.setDescription(dto.getDescription());
        module.setTheoryHours(dto.getTheoryHours());
        module.setPracticalHours(dto.getPracticalHours());

        Module updated = moduleRepo.save(module);
        return mapToDTO(updated);
    }

    @Override
    public void deleteModule(Long id) {
        moduleRepo.deleteById(id);
    }

    private ModuleDTO mapToDTO(Module module) {
        ModuleDTO dto = new ModuleDTO();
        dto.setId(module.getId());
        dto.setTitle(module.getTitle());
        dto.setDescription(module.getDescription());
        dto.setTheoryHours(module.getTheoryHours());
        dto.setPracticalHours(module.getPracticalHours());
        return dto;
    }
}
