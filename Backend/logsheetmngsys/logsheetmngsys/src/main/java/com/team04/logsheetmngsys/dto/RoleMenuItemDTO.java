package com.team04.logsheetmngsys.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleMenuItemDTO {

	private Long roleId;

	private List<Long> menuItemIds;
	
}
