package com.team04.logsheetmngsys.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "menu_items")
public class MenuItem extends BaseEntity {

	@Column(length = 100)
	private String title;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(length = 200)
	private String path;

}
