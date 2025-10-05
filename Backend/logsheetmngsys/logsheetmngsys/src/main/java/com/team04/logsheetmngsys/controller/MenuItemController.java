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

import com.team04.logsheetmngsys.dto.MenuItemDTO;
import com.team04.logsheetmngsys.dto.responseDto.MenuItemResponseDTO;
import com.team04.logsheetmngsys.service.MenuItemService;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

	private final MenuItemService menuItemService;

	@Autowired
	public MenuItemController(MenuItemService menuItemService) {
		this.menuItemService = menuItemService;
	}

	@PostMapping
	public ResponseEntity<MenuItemResponseDTO> createMenuItem(@RequestBody MenuItemDTO menuItemDTO) {
		MenuItemResponseDTO createdMenuItem = menuItemService.createMenuItem(menuItemDTO);
		return new ResponseEntity<>(createdMenuItem, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<MenuItemResponseDTO>> getAllMenuItems() {
		List<MenuItemResponseDTO> menuItems = menuItemService.getAllMenuItems();
		return new ResponseEntity<>(menuItems, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<MenuItemResponseDTO> getMenuItemById(@PathVariable Long id) {
		MenuItemResponseDTO menuItem = menuItemService.getMenuItemById(id);
		return new ResponseEntity<>(menuItem, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<MenuItemResponseDTO> updateMenuItem(@PathVariable Long id, @RequestBody MenuItemDTO menuItemDTO) {
		MenuItemResponseDTO updatedMenuItem = menuItemService.updateMenuItem(id, menuItemDTO);
		return new ResponseEntity<>(updatedMenuItem, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteMenuItem(@PathVariable Long id) {
		menuItemService.deleteMenuItem(id);
		return new ResponseEntity<>("MenuItem deleted successfully", HttpStatus.OK);
	}
}
