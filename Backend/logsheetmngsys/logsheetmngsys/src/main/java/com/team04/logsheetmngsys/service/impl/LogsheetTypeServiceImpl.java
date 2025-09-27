package com.team04.logsheetmngsys.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.team04.logsheetmngsys.dto.LogsheetTypeDTO;
import com.team04.logsheetmngsys.entity.LogsheetType;
import com.team04.logsheetmngsys.repository.LogsheetTypeRepository;
import com.team04.logsheetmngsys.service.LogsheetTypeService;

@Service
public class LogsheetTypeServiceImpl implements LogsheetTypeService {

    private final LogsheetTypeRepository logsheetTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public LogsheetTypeServiceImpl(LogsheetTypeRepository logsheetTypeRepository, ModelMapper modelMapper) {
        this.logsheetTypeRepository = logsheetTypeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
	@Transactional
    public LogsheetType createLogsheetType(LogsheetTypeDTO dto) {
        LogsheetType logsheetType = modelMapper.map(dto, LogsheetType.class);
        return logsheetTypeRepository.save(logsheetType);
    }

    @Override
	public List<LogsheetType> getAllLogsheetTypes() {
        return logsheetTypeRepository.findAll();
    }

    @Override
	public LogsheetType getLogsheetTypeById(Long id) {
        return logsheetTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LogsheetType not found with ID: " + id));
    }

    @Override
	@Transactional
    public LogsheetType updateLogsheetType(Long id, LogsheetTypeDTO dto) {
        LogsheetType existing = logsheetTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("LogsheetType not found with ID: " + id));

        modelMapper.map(dto, existing);
        return logsheetTypeRepository.save(existing);
    }

    @Override
	@Transactional
    public void deleteLogsheetType(Long id) {
        if (!logsheetTypeRepository.existsById(id)) {
            throw new RuntimeException("LogsheetType not found with ID: " + id);
        }
        logsheetTypeRepository.deleteById(id);
    }
}