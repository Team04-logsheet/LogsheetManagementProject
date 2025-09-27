package com.team04.logsheetmngsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.team04.logsheetmngsys.entity.LogsheetType;

@Repository
public interface LogsheetTypeRepository extends JpaRepository<LogsheetType, Long> {
}