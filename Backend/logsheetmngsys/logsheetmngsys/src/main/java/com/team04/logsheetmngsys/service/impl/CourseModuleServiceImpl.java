package com.team04.logsheetmngsys.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.CourseModuleDTO;
import com.team04.logsheetmngsys.dto.responseDto.CourseModuleResponseDTO;
import com.team04.logsheetmngsys.entity.Course;
import com.team04.logsheetmngsys.entity.CourseModule;
import com.team04.logsheetmngsys.entity.Module;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.CourseModuleRepository;
import com.team04.logsheetmngsys.repository.CourseRepository;
import com.team04.logsheetmngsys.repository.ModuleRepository;
import com.team04.logsheetmngsys.service.CourseModuleService;

import jakarta.transaction.Transactional;

@Service
public class CourseModuleServiceImpl implements CourseModuleService {

    private final CourseModuleRepository courseModuleRepository;
    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;

    public CourseModuleServiceImpl(CourseModuleRepository courseModuleRepository, CourseRepository courseRepository, ModuleRepository moduleRepository) {
        this.courseModuleRepository = courseModuleRepository;
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
    }

    @Override
    @Transactional
    public List<CourseModuleResponseDTO> assignModulesToCourse(CourseModuleDTO courseModuleDTO) {
        Course course = courseRepository.findById(courseModuleDTO.getCourseId())
                .orElseThrow(() -> new CustomException(
                        ErrorCode.COURSE_NOT_FOUND.getCode(),
                        ErrorCode.COURSE_NOT_FOUND.getMessage() + courseModuleDTO.getCourseId(),
                        HttpStatus.NOT_FOUND));

        List<Long> requestedIds = courseModuleDTO.getModuleIds();
        List<Module> modules = moduleRepository.findAllById(requestedIds);

        // Validate that all requested modules were found
        List<Long> foundIds = modules.stream().map(Module::getId).toList();
        List<Long> invalidIds = requestedIds.stream().filter(id -> !foundIds.contains(id)).toList();

        if (!invalidIds.isEmpty()) {
            throw new CustomException(
                    ErrorCode.INVALID_MODULE_IDS.getCode(),
                    ErrorCode.INVALID_MODULE_IDS.getMessage() + invalidIds,
                    HttpStatus.BAD_REQUEST);
        }

        List<CourseModule> courseModules = new ArrayList<>();
        for (Module module : modules) {
            CourseModule courseModule = new CourseModule();
            courseModule.setCourse(course);
            courseModule.setModule(module);
            courseModules.add(courseModule);
        }

        List<CourseModule> savedAssignments = courseModuleRepository.saveAll(courseModules);
    
        // Convert the saved entities to DTOs before returning
        return savedAssignments.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional // <-- ADD THIS ANNOTATION
    public List<CourseModuleResponseDTO> getAllCourseModules() {
        return courseModuleRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());    
    }

    @Override
    @Transactional
    public List<CourseModuleResponseDTO> getModulesByCourseId(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CustomException(
                    ErrorCode.COURSE_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_NOT_FOUND.getMessage() + courseId,
                    HttpStatus.NOT_FOUND);
        }
        // Convert the found entities to DTOs
        return courseModuleRepository.findByCourseId(courseId).stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());    
        }
    
    @Override
    @Transactional
    public void deleteModulesByCourseId(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new CustomException(
                    ErrorCode.COURSE_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_NOT_FOUND.getMessage() + courseId,
                    HttpStatus.NOT_FOUND);
        }
        courseModuleRepository.deleteByCourseId(courseId);
    }

    @Override
    @Transactional
    public void deleteModuleForCourse(Long courseId, Long moduleId) {
        if (!courseModuleRepository.existsByCourse_IdAndModule_Id(courseId, moduleId)) {
            // NOTE: You need to add COURSE_MODULE_NOT_FOUND to your ErrorCode enum
            throw new CustomException(
                    ErrorCode.COURSE_MODULE_NOT_FOUND.getCode(),
                    ErrorCode.COURSE_MODULE_NOT_FOUND.getMessage() + " for Course ID: " + courseId + " and Module ID: " + moduleId,
            		HttpStatus.NOT_FOUND);
        }
        courseModuleRepository.deleteByCourseIdAndModuleId(courseId, moduleId);
    }

    @Override
    public void deleteCourseModuleById(Long id) {
        if (!courseModuleRepository.existsById(id)) {
            throw new CustomException(
            		ErrorCode.COURSE_MODULE_NOT_FOUND.getCode(),
            		ErrorCode.COURSE_MODULE_NOT_FOUND.getMessage()+ " with ID: " + id,
            		HttpStatus.NOT_FOUND);
        }
        courseModuleRepository.deleteById(id);
    }
    
 // Helper method to convert the entity to a DTO
    private CourseModuleResponseDTO convertToResponseDTO(CourseModule courseModule) {
        CourseModuleResponseDTO dto = new CourseModuleResponseDTO();
        dto.setId(courseModule.getId());
        if (courseModule.getCourse() != null) {
            dto.setCourseId(courseModule.getCourse().getId());
            dto.setCourseName(courseModule.getCourse().getName());
        }
        if (courseModule.getModule() != null) {
            dto.setModuleId(courseModule.getModule().getId());
            dto.setModuleTitle(courseModule.getModule().getTitle());
        }
        return dto;
    }
}