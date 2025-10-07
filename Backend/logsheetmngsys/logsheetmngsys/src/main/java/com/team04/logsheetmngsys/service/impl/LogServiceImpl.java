package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.LogDTO;
import com.team04.logsheetmngsys.dto.responseDto.LogResponseDTO;
import com.team04.logsheetmngsys.entity.*;
import com.team04.logsheetmngsys.entity.Module;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.*;
import com.team04.logsheetmngsys.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LogServiceImpl implements LogService {

	private final LogRepository logRepository;
	private final StaffRepository staffRepository;
	private final CourseRepository courseRepository;
	private final ModuleRepository moduleRepository;
	private final TopicRepository topicRepository;
	private final LogsheetTypeRepository logsheetTypeRepository;

	@Autowired
	public LogServiceImpl(LogRepository logRepository, StaffRepository staffRepository,
			CourseRepository courseRepository, ModuleRepository moduleRepository, TopicRepository topicRepository,
			LogsheetTypeRepository logsheetTypeRepository) {
		this.logRepository = logRepository;
		this.staffRepository = staffRepository;
		this.courseRepository = courseRepository;
		this.moduleRepository = moduleRepository;
		this.topicRepository = topicRepository;
		this.logsheetTypeRepository = logsheetTypeRepository;
	}

	private LogResponseDTO convertToResponseDTO(Log log) {
		LogResponseDTO dto = new LogResponseDTO();
		dto.setId(log.getId());

		// Populate basic fields
		dto.setExtraTopicsCovered(log.getExtraTopicsCovered());
		dto.setTaskAssignGiven(log.getTaskAssignGiven());
		dto.setDescription(log.getDescription());
		dto.setIsVerified(log.getIsVerified());
		dto.setIsApproved(log.getIsApproved());
		dto.setApprovedAt(log.getApprovedAt());
		dto.setCreatedAt(log.getCreatedAt());
		dto.setUpdatedAt(log.getUpdatedAt());

		// Populate related entity IDs and Names/Titles
		if (log.getStaff() != null) {
			dto.setStaffId(log.getStaff().getId());
			dto.setStaffName(log.getStaff().getFirstName() + " " + log.getStaff().getLastName());
		}
		if (log.getLogsheetType() != null) {
			dto.setLogsheetTypeId(log.getLogsheetType().getId());
			dto.setLogsheetTypeTitle(log.getLogsheetType().getTitle());
		}
		if (log.getCourse() != null) {
			dto.setCourseId(log.getCourse().getId());
			dto.setCourseName(log.getCourse().getName());
		}
		if (log.getModule() != null) {
			dto.setModuleId(log.getModule().getId());
			dto.setModuleTitle(log.getModule().getTitle());
		}
		if (log.getTopic() != null) {
			dto.setTopicId(log.getTopic().getId());
			dto.setTopicName(log.getTopic().getTopicName());
		}

		return dto;
	}

	private Log convertToEntity(LogDTO dto) {
		Log log = new Log();
		updateLogEntityWithDTO(log, dto);
		return log;
	}

	private void updateLogEntityWithDTO(Log log, LogDTO dto) {
		// Fetch and set related entities
		Staff staff = staffRepository.findById(dto.getStaffId())
				.orElseThrow(() -> new CustomException(
						ErrorCode.STAFF_NOT_FOUND.getCode(),
						ErrorCode.STAFF_NOT_FOUND.getMessage() + dto.getStaffId(),
						HttpStatus.NOT_FOUND));

		LogsheetType logsheetType = logsheetTypeRepository.findById(dto.getLogsheetTypeId())
				.orElseThrow(() -> new CustomException(
						ErrorCode.LOGSHEET_TYPE_NOT_FOUND.getCode(),
						ErrorCode.LOGSHEET_TYPE_NOT_FOUND.getMessage() + dto.getLogsheetTypeId(),
						HttpStatus.NOT_FOUND));

		Course course = courseRepository.findById(dto.getCourseId())
				.orElseThrow(() -> new CustomException(
						ErrorCode.COURSE_NOT_FOUND.getCode(),
						ErrorCode.COURSE_NOT_FOUND.getMessage() + dto.getCourseId(), 
						HttpStatus.NOT_FOUND));

		Module module = moduleRepository.findById(dto.getModuleId())
				.orElseThrow(() -> new CustomException(
						ErrorCode.MODULE_NOT_FOUND.getCode(),
                        ErrorCode.MODULE_NOT_FOUND.getMessage() + dto.getModuleId(), 
                        HttpStatus.NOT_FOUND));

		Topic topic = topicRepository.findById(dto.getTopicId())
				.orElseThrow(() -> new CustomException(
						ErrorCode.TOPIC_NOT_FOUND.getCode(),
                        ErrorCode.TOPIC_NOT_FOUND.getMessage() + dto.getTopicId(), 
                        HttpStatus.NOT_FOUND));
				

		log.setStaff(staff);
		log.setLogsheetType(logsheetType);
		log.setCourse(course);
		log.setModule(module);
		log.setTopic(topic);

		log.setExtraTopicsCovered(dto.getExtraTopicsCovered());
		log.setTaskAssignGiven(dto.getTaskAssignGiven());
		log.setDescription(dto.getDescription());

		// Default values for new logs
		if (log.getId() == null) {
			log.setIsVerified(false);
			log.setIsApproved(false);
		}
	}

	@Override
	public LogResponseDTO createLog(LogDTO logDTO) {
		Log log = convertToEntity(logDTO);
		Log savedLog = logRepository.save(log);
		return convertToResponseDTO(savedLog);
	}

	@Override
	public LogResponseDTO getLogById(Long id) {
		Log log = logRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.LOG_NOT_FOUND.getCode(),
				ErrorCode.LOG_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND));

		return convertToResponseDTO(log);
	}

	@Override
	public List<LogResponseDTO> getAllLogs() {
		return logRepository.findAll().stream().map(this::convertToResponseDTO).collect(Collectors.toList());
	}

	@Override
	public LogResponseDTO updateLog(Long id, LogDTO logDTO) {
		Log existingLog = logRepository.findById(id)
				.orElseThrow(() -> new CustomException(ErrorCode.LOG_NOT_FOUND.getCode(),
						ErrorCode.LOG_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND));

		updateLogEntityWithDTO(existingLog, logDTO);

		Log updatedLog = logRepository.save(existingLog);
		return convertToResponseDTO(updatedLog);
	}

	@Override
	public void deleteLog(Long id) {
		if (!logRepository.existsById(id)) {
			throw new CustomException(ErrorCode.LOG_NOT_FOUND.getCode(), ErrorCode.LOG_NOT_FOUND.getMessage() + id,
					HttpStatus.NOT_FOUND);
		}
		logRepository.deleteById(id);
	}

	@Override
	public LogResponseDTO verifyLog(Long id) {
		Log log = logRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.LOG_NOT_FOUND.getCode(),
				ErrorCode.LOG_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND));
		log.setIsVerified(true);
		Log savedLog = logRepository.save(log);
		return convertToResponseDTO(savedLog);
	}

	@Override
	public LogResponseDTO approveLog(Long id) {
		Log log = logRepository.findById(id).orElseThrow(() -> new CustomException(ErrorCode.LOG_NOT_FOUND.getCode(),
				ErrorCode.LOG_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND));
		log.setIsApproved(true);
		log.setApprovedAt(LocalDateTime.now());
		Log savedLog = logRepository.save(log);
		return convertToResponseDTO(savedLog);
	}
	
    @Override
    public List<LogResponseDTO> getLogsByStaffId(Long staffId) {
        return logRepository.findByStaffId(staffId).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<LogResponseDTO> getLogsByCourseId(Long courseId) {
        return logRepository.findByCourseId(courseId).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<LogResponseDTO> getLogsByLogsheetTypeId(Long logsheetTypeId) {
        return logRepository.findByLogsheetTypeId(logsheetTypeId).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<LogResponseDTO> getLogsByModuleId(Long moduleId) {
        return logRepository.findByModuleId(moduleId).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<LogResponseDTO> getLogsByTopicId(Long topicId) {
        return logRepository.findByTopicId(topicId).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

}