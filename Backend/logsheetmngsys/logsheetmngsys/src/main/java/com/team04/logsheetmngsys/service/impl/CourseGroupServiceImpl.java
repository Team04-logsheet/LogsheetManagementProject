package com.team04.logsheetmngsys.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.CourseGroupDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseGroupResponseDTO;
import com.team04.logsheetmngsys.entity.Course;
import com.team04.logsheetmngsys.entity.CourseGroup;
import com.team04.logsheetmngsys.entity.GroupTable;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.mapper.CourseGroupMapper;
import com.team04.logsheetmngsys.repository.CourseGroupRepository;
import com.team04.logsheetmngsys.repository.CourseRepository;
import com.team04.logsheetmngsys.repository.GroupTableRepository;
import com.team04.logsheetmngsys.service.CourseGroupService;


@Service
public class CourseGroupServiceImpl implements CourseGroupService {

    private final CourseGroupRepository courseGroupRepository;
    private final CourseRepository courseRepository;
    private final GroupTableRepository groupTableRepository;

    public CourseGroupServiceImpl(CourseGroupRepository courseGroupRepository,
                                  CourseRepository courseRepository,
                                  GroupTableRepository groupTableRepository) {
        this.courseGroupRepository = courseGroupRepository;
        this.courseRepository = courseRepository;
        this.groupTableRepository = groupTableRepository;
    }

    @Override
    @Transactional
    public List<CourseGroupResponseDTO> assignGroupToCourse(CourseGroupDTO courseGroupDto) {
        Course course = courseRepository.findById(courseGroupDto.getCourseId())
                .orElseThrow(() -> new CustomException(
                        ErrorCode.COURSE_NOT_FOUND.getCode(),
                        ErrorCode.COURSE_NOT_FOUND.getMessage() + courseGroupDto.getCourseId(),
                        HttpStatus.NOT_FOUND));
        
        //if Course has already groups assigned,then throw exception
        if(courseGroupRepository.existsByCourse_Id(course.getId())) {
        	throw new CustomException(
                    ErrorCode.COURSE_GROUP_ALREADY_ASSIGNED.getCode(),
                    ErrorCode.COURSE_GROUP_ALREADY_ASSIGNED.getMessage() + course.getId(),
                    HttpStatus.BAD_REQUEST);
        }
        
        List<Long> requestedIds = courseGroupDto.getGroupIds();
        List<GroupTable> groups = groupTableRepository.findAllById(requestedIds);
        
        //Find invalid IDs
        List<Long> foundIds = groups.stream().map(GroupTable::getId).toList();
        List<Long> invalidIds = requestedIds.stream().filter(id -> !foundIds.contains(id)).toList();

        if (!invalidIds.isEmpty()) {
            throw new CustomException(
                    ErrorCode.INVALID_GROUP_IDS.getCode(),
                    ErrorCode.INVALID_GROUP_IDS.getMessage() + invalidIds,
                    HttpStatus.BAD_REQUEST
            );
        }
        
        //save mappings
        List<CourseGroup> courseGroups = new ArrayList<>();
        for (GroupTable group : groups) {
            CourseGroup courseGroup = new CourseGroup();
            courseGroup.setCourse(course);
            courseGroup.setGroup(group);
            courseGroups.add(courseGroup);
        }
        
        List<CourseGroup> savedCourseGroups = courseGroupRepository.saveAll(courseGroups);
        return CourseGroupMapper.toCourseGroupResponseDTOList(savedCourseGroups);
        
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CourseGroupResponseDTO> getAllCourseGroups() {
    	
    	List<CourseGroup>  courseGroups = courseGroupRepository.findAll();
    	return CourseGroupMapper.toCourseGroupResponseDTOList(courseGroups);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CourseGroupResponseDTO> getGroupsByCourseId(Long courseId) {
    	
    	if(!courseRepository.existsById(courseId)) {
    		throw new CustomException(
    				ErrorCode.COURSE_NOT_FOUND.getCode(),
    				ErrorCode.COURSE_NOT_FOUND.getMessage() + courseId,
    				HttpStatus.NOT_FOUND);
    	}
    	
    	List<CourseGroup> courseGroups = courseGroupRepository.findByCourseId(courseId);
    	if(courseGroups.isEmpty()) {
    		throw new CustomException(
    				ErrorCode.COURSE_GROUP_NOT_FOUND.getCode(),
    				ErrorCode.COURSE_GROUP_NOT_FOUND.getMessage() + courseId,
    				HttpStatus.NOT_FOUND);
    	}
    	return CourseGroupMapper.toCourseGroupResponseDTOList(courseGroups);
    }
    
	@Override
	@Transactional
	public void deleteGroupsByCourseId(Long courseId) {
		if (!courseRepository.existsById(courseId)) {
            throw new CustomException(
                    ErrorCode.COURSE_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_NOT_FOUND.getMessage() + courseId,
                    HttpStatus.NOT_FOUND);
        }
		
    	if(courseGroupRepository.findByCourseId(courseId).isEmpty()) {
    		throw new CustomException(
    				ErrorCode.COURSE_GROUP_NOT_FOUND.getCode(),
    				ErrorCode.COURSE_GROUP_NOT_FOUND.getMessage() + courseId,
    				HttpStatus.NOT_FOUND);
    	}
    	courseGroupRepository.deleteByCourseId(courseId);
	}

	@Override
	@Transactional
	public void deleteGroupForCourse(Long courseId, Long groupId) {
		if (!courseRepository.existsById(courseId)) {
            throw new CustomException(
                    ErrorCode.COURSE_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_NOT_FOUND.getMessage() + courseId,
                    HttpStatus.NOT_FOUND);
        }
		
		if (!groupTableRepository.existsById(groupId)) {
            throw new CustomException(
                    ErrorCode.GROUP_NOT_FOUND.getCode(),
                    ErrorCode.GROUP_NOT_FOUND.getMessage() + groupId,
                    HttpStatus.NOT_FOUND);
        }
		
		if( courseGroupRepository.findByCourseId(courseId).isEmpty()) {
            throw new CustomException(
                    ErrorCode.COURSE_GROUP_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_GROUP_NOT_FOUND.getMessage() + courseId,
                    HttpStatus.NOT_FOUND);
        }
		if( !courseGroupRepository.existsByCourse_IdAndGroup_Id(courseId, groupId)) {
			throw new CustomException(
                    ErrorCode.COURSE_GROUP_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_GROUP_NOT_FOUND.getMessage() + courseId + " and Groups ID " + groupId+" combination.",
                    HttpStatus.NOT_FOUND);
		}
		
		courseGroupRepository.deleteByCourse_IdAndGroup_Id(courseId, groupId);
	}

    @Override
    @Transactional
    public void deleteCourseGroup(Long id) {
    	if(!courseGroupRepository.existsById(id)) {
            throw new CustomException(
                    ErrorCode.COURSE_GROUP_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_GROUP_NOT_FOUND.getMessage() + id,
                    HttpStatus.NOT_FOUND);
        }
        courseGroupRepository.deleteById(id);
    }
    
    
}