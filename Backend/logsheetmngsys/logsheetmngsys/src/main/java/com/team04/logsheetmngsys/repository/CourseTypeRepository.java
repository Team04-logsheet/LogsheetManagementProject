package com.team04.logsheetmngsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team04.logsheetmngsys.entity.CourseType;

@Repository
public interface CourseTypeRepository extends JpaRepository<CourseType, Long> {

}
