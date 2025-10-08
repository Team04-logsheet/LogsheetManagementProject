package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.ModuleSubjectDTO;
import com.team04.logsheetmngsys.dto.responseDto.ModuleSubjectResponseDTO;
import java.util.List;

public interface ModuleSubjectService {

    List<ModuleSubjectResponseDTO> assignSubjectsToModule(ModuleSubjectDTO moduleSubjectDTO);

    List<ModuleSubjectResponseDTO> getSubjectsByModuleId(Long moduleId);

    void deleteSubjectsByModuleId(Long moduleId);
    
    void deleteSubjectForModule(Long moduleId, Long subjectId);
    
    List<ModuleSubjectResponseDTO> getAllModuleSubjects();
}