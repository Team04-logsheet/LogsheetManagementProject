package com.team04.logsheetmngsys.repository;

import com.team04.logsheetmngsys.entity.ModuleSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ModuleSubjectRepository extends JpaRepository<ModuleSubject, Long> {

    List<ModuleSubject> findByModuleId(Long moduleId);

    void deleteByModuleId(Long moduleId);

    void deleteByModuleIdAndSubjectId(Long moduleId, Long subjectId);

    boolean existsByModule_IdAndSubject_Id(Long moduleId, Long subjectId);
}