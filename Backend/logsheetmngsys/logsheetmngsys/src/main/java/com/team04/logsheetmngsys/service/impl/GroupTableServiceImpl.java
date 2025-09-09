package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.GroupTableDTO;
import com.team04.logsheetmngsys.entity.GroupTable;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.GroupTableRepository;
import com.team04.logsheetmngsys.service.GroupTableService;

@Service
public class GroupTableServiceImpl implements GroupTableService {

    private final GroupTableRepository groupTableRepository;
    private final ModelMapper modelMapper;

    public GroupTableServiceImpl(GroupTableRepository groupTableRepository, ModelMapper modelMapper) {
        this.groupTableRepository = groupTableRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public GroupTableDTO createGroup(GroupTableDTO dto) {
    	
    	if(dto.getId() != null) {
    		throw new CustomException(
    				ErrorCode.ID_SHOULD_BE_NULL.getCode(),
    				ErrorCode.ID_SHOULD_BE_NULL.getMessage(),
    				HttpStatus.BAD_REQUEST
    				);
    	}
    	
        GroupTable group = modelMapper.map(dto, GroupTable.class);
        GroupTable saved = groupTableRepository.save(group);
        return modelMapper.map(saved, GroupTableDTO.class);
    }

    @Override
    public GroupTableDTO updateGroup(Long id, GroupTableDTO dto) {
        GroupTable existing = groupTableRepository.findById(id)
                .orElseThrow(() -> new CustomException(
                		ErrorCode.GROUP_NOT_FOUND.getCode(),
                		ErrorCode.GROUP_NOT_FOUND.getMessage()+ id,
                		HttpStatus.NOT_FOUND
                		));

        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());

        GroupTable updated = groupTableRepository.save(existing);
        return modelMapper.map(updated, GroupTableDTO.class);
    }

    @Override
    public GroupTableDTO getGroupById(Long id) {
        GroupTable group = groupTableRepository.findById(id)
                .orElseThrow(() -> new CustomException(
                		ErrorCode.GROUP_NOT_FOUND.getCode(),
                		ErrorCode.GROUP_NOT_FOUND.getMessage()+ id,
                		HttpStatus.NOT_FOUND
                		));
        return modelMapper.map(group, GroupTableDTO.class);
    }

    @Override
    public List<GroupTableDTO> getAllGroups() {
        return groupTableRepository.findAll()
                .stream()
                .map(group -> modelMapper.map(group, GroupTableDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteGroup(Long id) {
    	if (!groupTableRepository.existsById(id)) {
            throw new CustomException(
                    ErrorCode.GROUP_NOT_FOUND.getCode(),
                    ErrorCode.GROUP_NOT_FOUND.getMessage() + id,
                    HttpStatus.NOT_FOUND
            );
        }
    	
    	groupTableRepository.deleteById(id);
    }
}