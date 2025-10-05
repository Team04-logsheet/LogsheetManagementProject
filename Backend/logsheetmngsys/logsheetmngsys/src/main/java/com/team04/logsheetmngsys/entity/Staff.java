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
@Table(name = "staffs")
public class Staff extends BaseEntity {

    @Column(name="first_name", length = 100)
    private String firstName;

    @Column(name="last_name", length = 100)
    private String lastName;

    @Column(unique = true, length = 150)
    private String email;

    @Column(length = 20)
    private String contact;

    @Column(name="staff_type",length = 50)
    private String staffType;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name="password_hash",length = 255)
    private String passwordHash;

    @Column(name="last_login")
    private LocalDateTime lastLogin;

    @Column(name="failed_attempts")
    private Integer failedAttempts;

    @Column(name="is_account_locked")
    private Boolean isAccountLocked;
    
    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;
    
}

