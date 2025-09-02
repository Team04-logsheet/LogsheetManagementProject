package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.RoleDTO;
import com.team04.logsheetmngsys.entity.Role;

public interface RoleService {

	Role createRole(RoleDTO roleDTO);

	List<Role> getAllRoles();

	Role getRoleById(Long id);

	Role updateRole(Long id, RoleDTO roleDTO);

	void deleteRole(Long id);

}