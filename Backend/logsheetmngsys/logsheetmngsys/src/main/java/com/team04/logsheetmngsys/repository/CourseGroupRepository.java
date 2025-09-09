package com.team04.logsheetmngsys.repository;

import com.team04.logsheetmngsys.entity.CourseGroup;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseGroupRepository extends JpaRepository<CourseGroup, Long> {

	List<CourseGroup> findByCourseId(Long courseId);
	
	void deleteByCourseId(Long courseId);
	
    boolean existsByCourse_IdAndGroup_Id(Long courseId, Long groupId);
    
    void deleteByCourse_IdAndGroup_Id(Long courseId, Long groupId);

	boolean existsByCourse_Id(Long id);

}