package com.team04.logsheetmngsys.entity;

import java.math.BigDecimal;

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
@Table(name = "modules")
public class Module extends BaseEntity {

	@Column(length = 100)
	private String title;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(name = "theory_hours")
	private BigDecimal theoryHours;

	@Column(name = "practical_hours")
	private BigDecimal practicalHours;

}
