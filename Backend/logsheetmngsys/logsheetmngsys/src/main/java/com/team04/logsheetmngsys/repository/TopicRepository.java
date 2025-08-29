package com.team04.logsheetmngsys.repository;

import com.team04.logsheetmngsys.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
