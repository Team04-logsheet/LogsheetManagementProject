package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.SectionDTO;
import java.util.List;

public interface SectionService {
    SectionDTO createSection(SectionDTO dto);
    SectionDTO updateSection(Long id, SectionDTO dto);
    SectionDTO getSectionById(Long id);
    List<SectionDTO> getAllSections();
    void deleteSection(Long id);
}
