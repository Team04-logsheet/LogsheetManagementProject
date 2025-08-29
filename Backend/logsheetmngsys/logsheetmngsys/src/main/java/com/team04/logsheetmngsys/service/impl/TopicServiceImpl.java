package com.team04.logsheetmngsys.service.impl;

import com.team04.logsheetmngsys.dto.TopicDTO;
import com.team04.logsheetmngsys.entity.Section;
import com.team04.logsheetmngsys.entity.Topic;
import com.team04.logsheetmngsys.repository.SectionRepository;
import com.team04.logsheetmngsys.repository.TopicRepository;
import com.team04.logsheetmngsys.service.TopicService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepo;
    private final SectionRepository sectionRepo;

    public TopicServiceImpl(TopicRepository topicRepo, SectionRepository sectionRepo) {
        this.topicRepo = topicRepo;
        this.sectionRepo = sectionRepo;
    }

    @Override
    public TopicDTO createTopic(TopicDTO dto) {
        Section section = sectionRepo.findById(dto.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));

        Topic topic = new Topic();
        topic.setTopicName(dto.getTopicName());
        topic.setSection(section);

        Topic saved = topicRepo.save(topic);

        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public TopicDTO getTopicById(Long id) {
        Topic topic = topicRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        TopicDTO dto = new TopicDTO();
        dto.setId(topic.getId());
        dto.setTopicName(topic.getTopicName());
        dto.setSectionId(topic.getSection().getId());

        return dto;
    }

    @Override
    public List<TopicDTO> getAllTopics() {
        return topicRepo.findAll().stream().map(t -> {
            TopicDTO dto = new TopicDTO();
            dto.setId(t.getId());
            dto.setTopicName(t.getTopicName());
            dto.setSectionId(t.getSection().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteTopic(Long id) {
        topicRepo.deleteById(id);
    }
}
