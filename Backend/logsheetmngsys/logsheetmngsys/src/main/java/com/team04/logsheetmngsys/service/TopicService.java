package com.team04.logsheetmngsys.service;

import com.team04.logsheetmngsys.dto.TopicDTO;
import java.util.List;

public interface TopicService {
    TopicDTO createTopic(TopicDTO dto);
    TopicDTO getTopicById(Long id);
    List<TopicDTO> getAllTopics();
    void deleteTopic(Long id);
}
