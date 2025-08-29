package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.dto.GroupTableDTO;
import com.team04.logsheetmngsys.entity.GroupTable;
import com.team04.logsheetmngsys.repository.GroupTableRepository;
import com.team04.logsheetmngsys.service.GroupTableService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupTableServiceImpl implements GroupTableService {

    private final GroupTableRepository repository;
    private final ModelMapper modelMapper;

    public GroupTableServiceImpl(GroupTableRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    public GroupTableDTO createGroup(GroupTableDTO dto) {
        GroupTable group = modelMapper.map(dto, GroupTable.class);
        GroupTable saved = repository.save(group);
        return modelMapper.map(saved, GroupTableDTO.class);
    }

    @Override
    public GroupTableDTO updateGroup(Long id, GroupTableDTO dto) {
        GroupTable existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found with id " + id));

        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());

        GroupTable updated = repository.save(existing);
        return modelMapper.map(updated, GroupTableDTO.class);
    }

    @Override
    public GroupTableDTO getGroupById(Long id) {
        GroupTable group = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found with id " + id));
        return modelMapper.map(group, GroupTableDTO.class);
    }

    @Override
    public List<GroupTableDTO> getAllGroups() {
        return repository.findAll()
                .stream()
                .map(group -> modelMapper.map(group, GroupTableDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteGroup(Long id) {
        repository.deleteById(id);
    }
}