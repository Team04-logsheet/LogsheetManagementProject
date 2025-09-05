package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.RoleDTO;
import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

	private final RoleService roleService;

	@Autowired
	public RoleController(RoleService roleService) {
		this.roleService = roleService;
	}

	@PostMapping
	public ResponseEntity<Role> createRole(@RequestBody RoleDTO roleDTO) {
		Role createdRole = roleService.createRole(roleDTO);
		return new ResponseEntity<>(createdRole, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Role>> getAllRoles() {
		List<Role> roles = roleService.getAllRoles();
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
		Role role = roleService.getRoleById(id);
		return new ResponseEntity<>(role, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Role> updateRole(@PathVariable Long id, @RequestBody RoleDTO roleDTO) {
		Role updatedRole = roleService.updateRole(id, roleDTO);
		return new ResponseEntity<>(updatedRole, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRole(@PathVariable Long id) {
		roleService.deleteRole(id);
		return new ResponseEntity<>("Role deleted successfully", HttpStatus.OK);
	}
}