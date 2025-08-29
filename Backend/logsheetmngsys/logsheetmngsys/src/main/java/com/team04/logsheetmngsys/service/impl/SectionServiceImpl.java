package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.dto.SectionDTO;
import com.team04.logsheetmngsys.entity.Section;
import com.team04.logsheetmngsys.entity.Subject;
import com.team04.logsheetmngsys.repository.SectionRepository;
import com.team04.logsheetmngsys.repository.SubjectRepository;
import com.team04.logsheetmngsys.service.SectionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final SubjectRepository subjectRepository;

    public SectionServiceImpl(SectionRepository sectionRepository, SubjectRepository subjectRepository) {
        this.sectionRepository = sectionRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public SectionDTO createSection(SectionDTO dto) {
        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Section section = new Section();
        section.setSectionName(dto.getSectionName());
        section.setSubject(subject);

        Section saved = sectionRepository.save(section);
        return mapToDTO(saved);
    }

    @Override
    public SectionDTO updateSection(Long id, SectionDTO dto) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        section.setSectionName(dto.getSectionName());
        section.setSubject(subject);

        Section updated = sectionRepository.save(section);
        return mapToDTO(updated);
    }

    @Override
    public SectionDTO getSectionById(Long id) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        return mapToDTO(section);
    }

    @Override
    public List<SectionDTO> getAllSections() {
        return sectionRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSection(Long id) {
        sectionRepository.deleteById(id);
    }

    private SectionDTO mapToDTO(Section section) {
        return new SectionDTO(
                section.getId(),
                section.getSectionName(),
                section.getSubject().getId()
        );
    }
}
