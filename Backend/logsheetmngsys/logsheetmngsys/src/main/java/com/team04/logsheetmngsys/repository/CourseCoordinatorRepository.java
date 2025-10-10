package com.team04.logsheetmngsys.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team04.logsheetmngsys.entity.CourseCoordinator;

import jakarta.transaction.Transactional;

@Repository
public interface CourseCoordinatorRepository extends JpaRepository<CourseCoordinator, Long> {

    List<CourseCoordinator> findByCourseId(Long courseId);

    List<CourseCoordinator> findByStaffId(Long staffId);

    @Transactional
    void deleteByCourseId(Long courseId);

    @Transactional
    void deleteByCourseIdAndStaffId(Long courseId, Long staffId);
    
    Optional<CourseCoordinator> findByCourseIdAndStaffId(Long courseId, Long staffId);
    // If duplicate entries exist,
    //"Query did not return a unique result: 2 results were returned"
    boolean existsByStaffIdAndIsActiveTrue(Long staffId);
    
    List<CourseCoordinator> findByIsActiveTrue();
}

