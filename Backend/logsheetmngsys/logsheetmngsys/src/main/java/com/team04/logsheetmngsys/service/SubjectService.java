package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.SubjectDTO;
import java.util.List;

public interface SubjectService {
    SubjectDTO createSubject(SubjectDTO dto);
    SubjectDTO updateSubject(Long id, SubjectDTO dto);
    SubjectDTO getSubjectById(Long id);
    List<SubjectDTO> getAllSubjects();
    void deleteSubject(Long id);
}
