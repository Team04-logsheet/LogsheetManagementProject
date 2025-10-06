package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.ModuleRouterDTO;
import com.team04.logsheetmngsys.dto.responseDto.ModuleRouterResponseDTO;

public interface ModuleRouterService {

    ModuleRouterResponseDTO assignRouterToModule(ModuleRouterDTO dto);

    List<ModuleRouterResponseDTO> getAllModuleRouters();

    List<ModuleRouterResponseDTO> getRoutersByModuleId(Long moduleId);

    List<ModuleRouterResponseDTO> getRoutersByStaffId(Long staffId);

    String deleteRoutersByModuleId(Long moduleId);

    String deleteRouter(Long moduleId, Long staffId);

    String deleteModuleRouterById(Long id);

    ModuleRouterResponseDTO deactivateRouter(Long moduleId, Long staffId);
}