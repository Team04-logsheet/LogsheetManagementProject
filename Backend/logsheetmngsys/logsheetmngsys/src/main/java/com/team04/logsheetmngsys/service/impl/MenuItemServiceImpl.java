package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.MenuItemDTO;
import com.team04.logsheetmngsys.dto.responseDto.MenuItemResponseDTO; // Import the new DTO
import com.team04.logsheetmngsys.entity.MenuItem;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.MenuItemRepository;
import com.team04.logsheetmngsys.service.MenuItemService;

@Service
public class MenuItemServiceImpl implements MenuItemService {

	private final MenuItemRepository menuItemRepository;
	private final ModelMapper modelMapper;

	public MenuItemServiceImpl(MenuItemRepository menuItemRepository, ModelMapper modelMapper) {
		this.menuItemRepository = menuItemRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public MenuItemResponseDTO createMenuItem(MenuItemDTO menuItemDTO) {
		MenuItem menuItem = modelMapper.map(menuItemDTO, MenuItem.class);
		MenuItem savedMenuItem = menuItemRepository.save(menuItem);
		// Map the saved entity to the response DTO before returning
		return modelMapper.map(savedMenuItem, MenuItemResponseDTO.class);
	}

	@Override
	public List<MenuItemResponseDTO> getAllMenuItems() {
		List<MenuItem> menuItems = menuItemRepository.findAll();
		// Map the list of entities to a list of response DTOs
		return menuItems.stream().map(menuItem -> modelMapper.map(menuItem, MenuItemResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public MenuItemResponseDTO getMenuItemById(Long id) {
		MenuItem menuItem = menuItemRepository.findById(id)
				.orElseThrow(() -> new CustomException(ErrorCode.MENU_ITEM_NOT_FOUND.getCode(),
						ErrorCode.MENU_ITEM_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND));
		// Map the found entity to the response DTO
		return modelMapper.map(menuItem, MenuItemResponseDTO.class);
	}

	@Override
	public MenuItemResponseDTO updateMenuItem(Long id, MenuItemDTO menuItemDTO) {
		MenuItem existingMenuItem = menuItemRepository.findById(id)
				.orElseThrow(() -> new CustomException(ErrorCode.MENU_ITEM_NOT_FOUND.getCode(),
						ErrorCode.MENU_ITEM_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND));

		modelMapper.map(menuItemDTO, existingMenuItem);
		MenuItem updatedMenuItem = menuItemRepository.save(existingMenuItem);
		// Map the updated entity to the response DTO
		return modelMapper.map(updatedMenuItem, MenuItemResponseDTO.class);
	}

	@Override
	public void deleteMenuItem(Long id) {
		if (!menuItemRepository.existsById(id)) {
			throw new CustomException(ErrorCode.MENU_ITEM_NOT_FOUND.getCode(),
					ErrorCode.MENU_ITEM_NOT_FOUND.getMessage() + id, HttpStatus.NOT_FOUND);
		}
		menuItemRepository.deleteById(id);
	}
}