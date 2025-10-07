package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.LogDTO;
import com.team04.logsheetmngsys.dto.responseDto.LogResponseDTO;
import java.util.List;

public interface LogService {

    LogResponseDTO createLog(LogDTO logDTO);

    LogResponseDTO getLogById(Long id);

    List<LogResponseDTO> getAllLogs();

    LogResponseDTO updateLog(Long id, LogDTO logDTO);

    void deleteLog(Long id);

    LogResponseDTO verifyLog(Long id);

    LogResponseDTO approveLog(Long id);
    
    List<LogResponseDTO> getLogsByStaffId(Long staffId);

    List<LogResponseDTO> getLogsByCourseId(Long courseId);
    
    List<LogResponseDTO> getLogsByLogsheetTypeId(Long logsheetTypeId);

    List<LogResponseDTO> getLogsByModuleId(Long moduleId);

    List<LogResponseDTO> getLogsByTopicId(Long topicId);
}