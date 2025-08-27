package com.team04.logsheetmngsys.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "batch_cycles")
public class BatchCycle extends BaseEntity {

	@Column(length = 100)
	private String title;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "end_date")
	private LocalDate endDate;

	public BatchCycle(String title, String description, LocalDate startDate, LocalDate endDate) {
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}

}
