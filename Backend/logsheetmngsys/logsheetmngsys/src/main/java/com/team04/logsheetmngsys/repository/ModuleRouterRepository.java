package com.team04.logsheetmngsys.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team04.logsheetmngsys.entity.ModuleRouter;

import jakarta.transaction.Transactional;

@Repository
public interface ModuleRouterRepository extends JpaRepository<ModuleRouter, Long> {

    List<ModuleRouter> findByModuleId(Long moduleId);

    List<ModuleRouter> findByStaffId(Long staffId);

    Optional<ModuleRouter> findByModuleIdAndStaffId(Long moduleId, Long staffId);
    
    @Transactional
    void deleteByModuleId(Long moduleId);

    @Transactional
    void deleteByModuleIdAndStaffId(Long moduleId, Long staffId);
}