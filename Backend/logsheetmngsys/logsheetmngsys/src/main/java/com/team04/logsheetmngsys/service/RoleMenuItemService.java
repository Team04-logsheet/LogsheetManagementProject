package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.RoleMenuItemDTO;
import com.team04.logsheetmngsys.entity.RoleMenuItem;

public interface RoleMenuItemService {

	List<RoleMenuItem> assignMenuItemsToRole(RoleMenuItemDTO roleMenuItemDTO);

	List<RoleMenuItem> getAllRoleMenuItems();

	List<RoleMenuItem> getMenuItemsByRoleId(Long roleId);

	void deleteMenuItemsByRoleId(Long roleId);
	
	void deleteMenuItemForRole(Long roleId, Long menuItemId);
	
	void deleteRoleMenuItem(Long id);


}