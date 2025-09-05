package com.team04.logsheetmngsys.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.MenuItemDTO;
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
	public MenuItem createMenuItem(MenuItemDTO menuItemDTO) {
		MenuItem menuItem = modelMapper.map(menuItemDTO, MenuItem.class);
		return menuItemRepository.save(menuItem);
	}

	@Override
	public List<MenuItem> getAllMenuItems() {
		return menuItemRepository.findAll();
	}

	@Override
	public MenuItem getMenuItemById(Long id) {
		return menuItemRepository.findById(id)
				.orElseThrow(() -> new CustomException(
						ErrorCode.MENU_ITEM_NOT_FOUND.getCode(),
						ErrorCode.MENU_ITEM_NOT_FOUND.getMessage()+ id,
						HttpStatus.NOT_FOUND
				));
	}

	@Override
	public MenuItem updateMenuItem(Long id, MenuItemDTO menuItemDTO) {
		MenuItem existingMenuItem = menuItemRepository.findById(id)
				.orElseThrow(() -> new CustomException(
                        ErrorCode.MENU_ITEM_NOT_FOUND.getCode(),
                        ErrorCode.MENU_ITEM_NOT_FOUND.getMessage()+ id,
                        HttpStatus.NOT_FOUND
                ));

		modelMapper.map(menuItemDTO, existingMenuItem);

		return menuItemRepository.save(existingMenuItem);
	}

	@Override
	public void deleteMenuItem(Long id) {
		if (!menuItemRepository.existsById(id)) {
			throw new CustomException(
                    ErrorCode.MENU_ITEM_NOT_FOUND.getCode(),
                    ErrorCode.MENU_ITEM_NOT_FOUND.getMessage()+ id,
                    HttpStatus.NOT_FOUND
            );
		}
		menuItemRepository.deleteById(id);
	}
}
