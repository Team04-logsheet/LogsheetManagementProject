package com.team04.logsheetmngsys.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role_menu_items", 
		uniqueConstraints = { 
				@UniqueConstraint(columnNames = { "role_id", "menu_item_id" })
		}
)
public class RoleMenuItem extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;

	@ManyToOne
	@JoinColumn(name = "menu_item_id")
	private MenuItem menuItem;

}
