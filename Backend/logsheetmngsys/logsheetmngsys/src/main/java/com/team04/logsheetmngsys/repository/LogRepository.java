package com.team04.logsheetmngsys.repository;

import com.team04.logsheetmngsys.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {

    List<Log> findByStaffId(Long staffId);

    List<Log> findByCourseId(Long courseId);
    
    List<Log> findByLogsheetTypeId(Long logsheetTypeId);

    List<Log> findByModuleId(Long moduleId);

    List<Log> findByTopicId(Long topicId);
    
}