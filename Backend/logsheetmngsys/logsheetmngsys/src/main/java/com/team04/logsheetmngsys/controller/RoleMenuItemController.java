package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.RoleMenuItemDTO;
import com.team04.logsheetmngsys.entity.RoleMenuItem;
import com.team04.logsheetmngsys.service.RoleMenuItemService;

@RestController
@RequestMapping("/api/role-menu-items")
public class RoleMenuItemController {

	private final RoleMenuItemService roleMenuItemService;

	@Autowired
	public RoleMenuItemController(RoleMenuItemService roleMenuItemService) {
		this.roleMenuItemService = roleMenuItemService;
	}

	@PostMapping
	public ResponseEntity<List<RoleMenuItem>> assignMenuItemsToRole(@RequestBody RoleMenuItemDTO roleMenuItemDTO) {
		List<RoleMenuItem> createdRoleMenuItems = roleMenuItemService.assignMenuItemsToRole(roleMenuItemDTO);
		return new ResponseEntity<>(createdRoleMenuItems, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<RoleMenuItem>> getAllRoleMenuItems() {
		return new ResponseEntity<>(roleMenuItemService.getAllRoleMenuItems(), HttpStatus.OK);
	}

	@GetMapping("/role/{roleId}")
	public ResponseEntity<List<RoleMenuItem>> getMenuItemsByRoleId(@PathVariable Long roleId) {
		return new ResponseEntity<>(roleMenuItemService.getMenuItemsByRoleId(roleId), HttpStatus.OK);
	}
	
	@DeleteMapping("/role/{roleId}/menu-items")
	public ResponseEntity<String> deleteMenuItemsByRole(@PathVariable Long roleId) {
	    roleMenuItemService.deleteMenuItemsByRoleId(roleId);
	    return ResponseEntity.ok("All menu items removed for role ID: " + roleId);
	}
	
	@DeleteMapping("/role/{roleId}/menu-items/{menuItemId}")
	public ResponseEntity<String> deleteMenuItemForRole(
	        @PathVariable Long roleId,
	        @PathVariable Long menuItemId) {
	    
	    roleMenuItemService.deleteMenuItemForRole(roleId, menuItemId);
	    return ResponseEntity.ok("Menu item ID " + menuItemId + " removed from role ID " + roleId);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteRoleMenuItem(@PathVariable Long id) {
		roleMenuItemService.deleteRoleMenuItem(id);
		return new ResponseEntity<>("RoleMenuItem deleted successfully", HttpStatus.OK);
	}
}
