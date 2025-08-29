package com.team04.logsheetmngsys.repository;

import com.team04.logsheetmngsys.entity.CourseGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {
}