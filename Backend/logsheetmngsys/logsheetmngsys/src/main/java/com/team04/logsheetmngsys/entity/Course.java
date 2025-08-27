package com.team04.logsheetmngsys.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "courses")
public class Course extends BaseEntity{

	@Column(length = 100)
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "batch_cycle_id")
	private BatchCycle batchCycle;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "premises_id")
	private Premise premise;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "course_type_id")
	private CourseType courseType;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "end_date")
	private LocalDate endDate;
	
}
