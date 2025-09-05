package com.team04.logsheetmngsys.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.RoleDTO;
import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.RoleRepository;
import com.team04.logsheetmngsys.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    public RoleServiceImpl(RoleRepository roleRepository, ModelMapper modelMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
	public Role createRole(RoleDTO roleDTO) {
        Role role = modelMapper.map(roleDTO, Role.class);
        return roleRepository.save(role);
    }

    @Override
	public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
	public Role getRoleById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new CustomException(
                		ErrorCode.ROLE_NOT_FOUND.getCode(),
                        ErrorCode.ROLE_NOT_FOUND.getMessage() + id,
                        HttpStatus.NOT_FOUND
                		));         
    }

    @Override
	public Role updateRole(Long id, RoleDTO roleDTO) {
        Role existingRole = roleRepository.findById(id)
                .orElseThrow(() -> new CustomException(
                		ErrorCode.ROLE_NOT_FOUND.getCode(),
                        ErrorCode.ROLE_NOT_FOUND.getMessage() + id,
                        HttpStatus.NOT_FOUND
                		));

        modelMapper.map(roleDTO, existingRole);
        return roleRepository.save(existingRole);
    }

    @Override
	public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) 
        {
            throw new CustomException(
            		ErrorCode.ROLE_NOT_FOUND.getCode(),
                    ErrorCode.ROLE_NOT_FOUND.getMessage() + id,
                    HttpStatus.NOT_FOUND
            		);
        }
        roleRepository.deleteById(id);
    }
}