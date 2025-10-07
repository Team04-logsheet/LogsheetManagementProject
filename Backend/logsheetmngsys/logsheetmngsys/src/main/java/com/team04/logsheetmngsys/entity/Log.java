package com.team04.logsheetmngsys.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "logs")
public class Log extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "staff_id")
	private Staff staff;
	
	@ManyToOne
	@JoinColumn(name = "logsheet_type_id")
	private LogsheetType logsheetType;
	
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course course;
	
    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    @Column(name = "extra_topics_covered", columnDefinition = "TEXT")
    private String extraTopicsCovered;

    @Column(name = "task_assign_given", columnDefinition = "TEXT")
    private String taskAssignGiven;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_verified")
    private Boolean isVerified;

    @Column(name = "is_approved")
    private Boolean isApproved;

    @Column(name = "verified_at")
    private LocalDateTime approvedAt;
    
}
