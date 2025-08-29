package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.dto.CourseGroupDTO;
import com.team04.logsheetmngsys.entity.Course;
import com.team04.logsheetmngsys.entity.CourseGroup;
import com.team04.logsheetmngsys.entity.GroupTable;
import com.team04.logsheetmngsys.repository.CourseGroupRepository;
import com.team04.logsheetmngsys.repository.CourseRepository;
import com.team04.logsheetmngsys.repository.GroupTableRepository;
import com.team04.logsheetmngsys.service.CourseGroupService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public CourseGroupDTO createCourseGroup(CourseGroupDTO dto) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        GroupTable group = groupTableRepository.findById(dto.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        CourseGroup courseGroup = new CourseGroup();
        courseGroup.setCourse(course);
        courseGroup.setGroup(group);

        CourseGroup saved = courseGroupRepository.save(courseGroup);
        return new CourseGroupDTO(saved.getId(), saved.getCourse().getId(), saved.getGroup().getId());
    }

    @Override
    public CourseGroupDTO updateCourseGroup(Long id, CourseGroupDTO dto) {
        CourseGroup existing = courseGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CourseGroup not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        GroupTable group = groupTableRepository.findById(dto.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        existing.setCourse(course);
        existing.setGroup(group);

        CourseGroup updated = courseGroupRepository.save(existing);
        return new CourseGroupDTO(updated.getId(), updated.getCourse().getId(), updated.getGroup().getId());
    }

    @Override
    public CourseGroupDTO getCourseGroupById(Long id) {
        CourseGroup courseGroup = courseGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CourseGroup not found"));
        return new CourseGroupDTO(courseGroup.getId(),
                courseGroup.getCourse().getId(),
                courseGroup.getGroup().getId());
    }

    @Override
    public List<CourseGroupDTO> getAllCourseGroups() {
        return courseGroupRepository.findAll().stream()
                .map(cg -> new CourseGroupDTO(cg.getId(),
                        cg.getCourse().getId(),
                        cg.getGroup().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCourseGroup(Long id) {
        courseGroupRepository.deleteById(id);
    }
}