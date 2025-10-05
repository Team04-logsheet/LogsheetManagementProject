package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.MenuItemDTO;
import com.team04.logsheetmngsys.dto.responseDto.MenuItemResponseDTO; // Import the new DTO

public interface MenuItemService {

	MenuItemResponseDTO createMenuItem(MenuItemDTO menuItemDTO);

	List<MenuItemResponseDTO> getAllMenuItems();

	MenuItemResponseDTO getMenuItemById(Long id);

	MenuItemResponseDTO updateMenuItem(Long id, MenuItemDTO menuItemDTO);

	void deleteMenuItem(Long id);

}