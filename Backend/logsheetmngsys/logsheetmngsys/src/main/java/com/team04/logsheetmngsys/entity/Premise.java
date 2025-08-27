package com.team04.logsheetmngsys.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "premises")
public class Premise extends BaseEntity {

	@Column(length = 100)
	private String title;

	@Column(columnDefinition = "TEXT")
	private String address;

	@Column(columnDefinition = "TEXT")
	private String description;

}
