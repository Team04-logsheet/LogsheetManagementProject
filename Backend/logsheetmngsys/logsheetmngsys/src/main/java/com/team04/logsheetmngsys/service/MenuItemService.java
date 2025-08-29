package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.MenuItemDTO;
import com.team04.logsheetmngsys.entity.MenuItem;

public interface MenuItemService {

	MenuItem createMenuItem(MenuItemDTO menuItemDTO);

	List<MenuItem> getAllMenuItems();

	MenuItem getMenuItemById(Long id);

	MenuItem updateMenuItem(Long id, MenuItemDTO menuItemDTO);

	void deleteMenuItem(Long id);

}
