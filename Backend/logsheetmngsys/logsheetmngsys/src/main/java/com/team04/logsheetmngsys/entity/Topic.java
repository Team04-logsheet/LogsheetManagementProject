package com.team04.logsheetmngsys.entity;

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
@Table(name = "topics")
public class Topic extends BaseEntity {

	@Column(name = "topic_name", length = 100)
	private String topicName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "section_id")
	private Section section;
	
}