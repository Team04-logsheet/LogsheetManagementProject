package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.ModuleDTO;
import java.util.List;

public interface ModuleService {
    ModuleDTO createModule(ModuleDTO dto);
    ModuleDTO getModuleById(Long id);
    List<ModuleDTO> getAllModules();
    ModuleDTO updateModule(Long id, ModuleDTO dto);
    void deleteModule(Long id);
}
