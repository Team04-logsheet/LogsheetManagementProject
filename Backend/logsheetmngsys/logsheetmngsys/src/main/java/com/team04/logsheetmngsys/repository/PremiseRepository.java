package com.team04.logsheetmngsys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.team04.logsheetmngsys.entity.Premise;

@Repository
public interface PremiseRepository extends JpaRepository<Premise, Long> {
}