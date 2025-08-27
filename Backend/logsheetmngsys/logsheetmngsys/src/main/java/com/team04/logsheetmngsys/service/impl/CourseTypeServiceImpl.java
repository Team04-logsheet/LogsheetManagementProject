package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.team04.logsheetmngsys.dto.CourseTypeDTO;
import com.team04.logsheetmngsys.entity.CourseType;
import com.team04.logsheetmngsys.repository.CourseTypeRepository;
import com.team04.logsheetmngsys.service.CourseTypeService;

@Service
public class CourseTypeServiceImpl implements CourseTypeService {

	private final CourseTypeRepository courseTypeRepository;
	private final ModelMapper modelMapper;

	@Autowired
	public CourseTypeServiceImpl(CourseTypeRepository courseTypeRepository, ModelMapper modelMapper) {
		this.courseTypeRepository = courseTypeRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public CourseType createCourseType(CourseTypeDTO courseTypeDTO) {
		CourseType courseType = modelMapper.map(courseTypeDTO, CourseType.class);
		return courseTypeRepository.save(courseType);
	}

	@Override
	public List<CourseType> getAllCourseTypes() {
		return courseTypeRepository.findAll();
	}

	@Override
	public Optional<CourseType> getCourseTypeById(Long id) {
		return courseTypeRepository.findById(id);
	}

	@Override
	public CourseType updateCourseType(Long id, CourseTypeDTO courseTypeDTO) {
		CourseType existingCourseType = courseTypeRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "CourseType not found with ID: " + id));
		modelMapper.map(courseTypeDTO, existingCourseType);
		return courseTypeRepository.save(existingCourseType);
	}

	@Override
	public void deleteCourseType(Long id) {
		if (!courseTypeRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CourseType not found with ID: " + id);
		}
		courseTypeRepository.deleteById(id);
	}

}
