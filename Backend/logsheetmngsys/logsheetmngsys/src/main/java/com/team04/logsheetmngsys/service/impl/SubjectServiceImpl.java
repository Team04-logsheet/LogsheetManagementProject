package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.dto.SubjectDTO;
import com.team04.logsheetmngsys.entity.Subject;
import com.team04.logsheetmngsys.repository.SubjectRepository;
import com.team04.logsheetmngsys.service.SubjectService;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository repository;

    public SubjectServiceImpl(SubjectRepository repository) {
        this.repository = repository;
    }

    private SubjectDTO mapToDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setId(subject.getId());
        dto.setSubjectName(subject.getSubjectName());
        return dto;
    }

    private Subject mapToEntity(SubjectDTO dto) {
        Subject subject = new Subject();
        subject.setId(dto.getId());
        subject.setSubjectName(dto.getSubjectName());
        return subject;
    }

    @Override
    public SubjectDTO createSubject(SubjectDTO dto) {
        Subject subject = mapToEntity(dto);
        return mapToDTO(repository.save(subject));
    }

    @Override
    public SubjectDTO updateSubject(Long id, SubjectDTO dto) {
        Subject subject = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        subject.setSubjectName(dto.getSubjectName());
        return mapToDTO(repository.save(subject));
    }

    @Override
    public SubjectDTO getSubjectById(Long id) {
        return repository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    @Override
    public List<SubjectDTO> getAllSubjects() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteSubject(Long id) {
        repository.deleteById(id);
    }
}
