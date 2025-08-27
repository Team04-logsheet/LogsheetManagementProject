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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "logsheet_types")
public class LogsheetType extends BaseEntity {

    @Column(length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "percent_theory")
    private BigDecimal percentTheory;

    @Column(name = "percent_practical")
    private BigDecimal percentPractical;

    @Column(name = "topic_required")
    private Boolean topicRequired;

    @Column(name = "group_required")
    private Boolean groupRequired;
    
}
