package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.ModuleSubjectDTO;
import com.team04.logsheetmngsys.dto.responseDto.ModuleSubjectResponseDTO;
import com.team04.logsheetmngsys.entity.Module;
import com.team04.logsheetmngsys.entity.ModuleSubject;
import com.team04.logsheetmngsys.entity.Subject;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.ModuleRepository;
import com.team04.logsheetmngsys.repository.ModuleSubjectRepository;
import com.team04.logsheetmngsys.repository.SubjectRepository;
import com.team04.logsheetmngsys.service.ModuleSubjectService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleSubjectServiceImpl implements ModuleSubjectService {

	private final ModuleSubjectRepository moduleSubjectRepository;
	private final ModuleRepository moduleRepository;
	private final SubjectRepository subjectRepository;

	public ModuleSubjectServiceImpl(ModuleSubjectRepository moduleSubjectRepository, ModuleRepository moduleRepository,
			SubjectRepository subjectRepository) {
		this.moduleSubjectRepository = moduleSubjectRepository;
		this.moduleRepository = moduleRepository;
		this.subjectRepository = subjectRepository;
	}

	private ModuleSubjectResponseDTO convertToResponseDTO(ModuleSubject moduleSubject) {
		ModuleSubjectResponseDTO dto = new ModuleSubjectResponseDTO();
		dto.setId(moduleSubject.getId());
		if (moduleSubject.getModule() != null) {
			dto.setModuleId(moduleSubject.getModule().getId());
			dto.setModuleTitle(moduleSubject.getModule().getTitle());
		}
		if (moduleSubject.getSubject() != null) {
			dto.setSubjectId(moduleSubject.getSubject().getId());
			dto.setSubjectName(moduleSubject.getSubject().getSubjectName()); // Assuming getSubjectName() exists
		}
		return dto;
	}

    @Override
    @Transactional
    public List<ModuleSubjectResponseDTO> getAllModuleSubjects() {
        return moduleSubjectRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
	
	@Override
	@Transactional
	public List<ModuleSubjectResponseDTO> assignSubjectsToModule(ModuleSubjectDTO moduleSubjectDTO) {
		Module module = moduleRepository.findById(moduleSubjectDTO.getModuleId())
				.orElseThrow(() -> new CustomException(
						ErrorCode.MODULE_NOT_FOUND.getCode(),
						ErrorCode.MODULE_NOT_FOUND.getMessage() + moduleSubjectDTO.getModuleId(),
						HttpStatus.NOT_FOUND));

		List<Long> requestedIds = moduleSubjectDTO.getSubjectIds();
		List<Subject> subjects = subjectRepository.findAllById(requestedIds);

		// Validate that all requested subjects were found
		List<Long> foundIds = subjects.stream().map(Subject::getId).toList();
		List<Long> invalidIds = requestedIds.stream().filter(id -> !foundIds.contains(id)).toList();
		if (!invalidIds.isEmpty()) {
			throw new CustomException(
					ErrorCode.SUBJECT_NOT_FOUND.getCode(),
					ErrorCode.SUBJECT_NOT_FOUND.getMessage() + invalidIds, 
					HttpStatus.BAD_REQUEST);
		}

		List<ModuleSubject> newAssignments = new ArrayList<>();
		for (Subject subject : subjects) {
			// Check for duplicates before adding
			if (moduleSubjectRepository.existsByModule_IdAndSubject_Id(module.getId(), subject.getId())) {
				// You can choose to throw an error or silently skip duplicates. Throwing an
				// error is often better.
				throw new CustomException(
						ErrorCode.DUPLICATE_ASSIGNMENT.getCode(),
						ErrorCode.DUPLICATE_ASSIGNMENT.getMessage() + " Module ID: " + module.getId() + ", Subject ID: " + subject.getId(),
						HttpStatus.CONFLICT);
			}
			ModuleSubject moduleSubject = new ModuleSubject(module, subject);
			newAssignments.add(moduleSubject);
		}

		List<ModuleSubject> savedAssignments = moduleSubjectRepository.saveAll(newAssignments);

		return savedAssignments.stream().map(this::convertToResponseDTO).collect(Collectors.toList());
	}

	@Override
	@Transactional
	public List<ModuleSubjectResponseDTO> getSubjectsByModuleId(Long moduleId) {
		if (!moduleRepository.existsById(moduleId)) {
			throw new CustomException(
					ErrorCode.MODULE_NOT_FOUND.getCode(),
					ErrorCode.MODULE_NOT_FOUND.getMessage() + moduleId, 
					HttpStatus.NOT_FOUND);
		}
		return moduleSubjectRepository.findByModuleId(moduleId).stream().map(this::convertToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void deleteSubjectsByModuleId(Long moduleId) {
		if (!moduleRepository.existsById(moduleId)) {
			throw new CustomException(
					ErrorCode.MODULE_NOT_FOUND.getCode(),
					ErrorCode.MODULE_NOT_FOUND.getMessage() + moduleId, 
					HttpStatus.NOT_FOUND);
		}
		moduleSubjectRepository.deleteByModuleId(moduleId);
	}

	@Override
	@Transactional
	public void deleteSubjectForModule(Long moduleId, Long subjectId) {
		if (!moduleSubjectRepository.existsByModule_IdAndSubject_Id(moduleId, subjectId)) {
			throw new CustomException(
					ErrorCode.ASSIGNMENT_NOT_FOUND.getCode(),
					ErrorCode.ASSIGNMENT_NOT_FOUND.getMessage() + " Module ID: " + moduleId + ", Subject ID: " + subjectId,
					HttpStatus.NOT_FOUND);
		}
		moduleSubjectRepository.deleteByModuleIdAndSubjectId(moduleId, subjectId);
	}
}