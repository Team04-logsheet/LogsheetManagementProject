package com.team04.logsheetmngsys.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.dto.RoleMenuItemDTO;
import com.team04.logsheetmngsys.entity.MenuItem;
import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.entity.RoleMenuItem;
import com.team04.logsheetmngsys.repository.MenuItemRepository;
import com.team04.logsheetmngsys.repository.RoleMenuItemRepository;
import com.team04.logsheetmngsys.repository.RoleRepository;
import com.team04.logsheetmngsys.service.RoleMenuItemService;

import jakarta.transaction.Transactional;

@Service
public class RoleMenuItemServiceImpl implements RoleMenuItemService {

	private final RoleMenuItemRepository roleMenuItemRepository;
	private final RoleRepository roleRepository;
	private final MenuItemRepository menuItemRepository;

	public RoleMenuItemServiceImpl(RoleMenuItemRepository roleMenuItemRepository, RoleRepository roleRepository,
			MenuItemRepository menuItemRepository) {
		this.roleMenuItemRepository = roleMenuItemRepository;
		this.roleRepository = roleRepository;
		this.menuItemRepository = menuItemRepository;
	}

	@Override
	@Transactional
	public List<RoleMenuItem> assignMenuItemsToRole(RoleMenuItemDTO roleMenuItemDTO) {
		Role role = roleRepository.findById(roleMenuItemDTO.getRoleId())
				.orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleMenuItemDTO.getRoleId()));

		// Fetch all menu items
		List<Long> requestedIds = roleMenuItemDTO.getMenuItemIds();
		List<MenuItem> menuItems = menuItemRepository.findAllById(requestedIds);

		// Find invalid IDs
		List<Long> foundIds = menuItems.stream().map(MenuItem::getId).toList();

		List<Long> invalidIds = requestedIds.stream().filter(id -> !foundIds.contains(id)).toList();

		if (!invalidIds.isEmpty()) {
			throw new RuntimeException("Invalid MenuItem IDs: " + invalidIds);
		}

		// Save mappings
		List<RoleMenuItem> roleMenuItems = new ArrayList<>();
		for (MenuItem menuItem : menuItems) {
			RoleMenuItem roleMenuItem = new RoleMenuItem();
			roleMenuItem.setRole(role);
			roleMenuItem.setMenuItem(menuItem);
			roleMenuItems.add(roleMenuItem);
		}

		// Batch save instead of saving one by one
		return roleMenuItemRepository.saveAll(roleMenuItems);
	}

	@Override
	public List<RoleMenuItem> getAllRoleMenuItems() {
		return roleMenuItemRepository.findAll();
	}

	@Override
	public List<RoleMenuItem> getMenuItemsByRoleId(Long roleId) {
		return roleMenuItemRepository.findByRoleId(roleId);
	}

	@Override
	public void deleteMenuItemsByRoleId(Long roleId) {
		roleMenuItemRepository.deleteByRoleId(roleId);
	}

	@Override
	public void deleteMenuItemForRole(Long roleId, Long menuItemId) {
		roleMenuItemRepository.deleteByRoleIdAndMenuItemId(roleId, menuItemId);
	}

	@Override
	public void deleteRoleMenuItem(Long id) {
		if (!roleMenuItemRepository.existsById(id)) {
			throw new RuntimeException("RoleMenuItem not found with ID: " + id);
		}
		roleMenuItemRepository.deleteById(id);
	}
}
