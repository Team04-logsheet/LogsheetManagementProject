package com.team04.logsheetmngsys.repository;

import com.team04.logsheetmngsys.entity.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {
    
    List<CourseModule> findByCourseId(Long courseId);

    void deleteByCourseId(Long courseId);

    void deleteByCourseIdAndModuleId(Long courseId, Long moduleId);

    boolean existsByCourse_IdAndModule_Id(Long courseId, Long moduleId);
}