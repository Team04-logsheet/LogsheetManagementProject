package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.TopicDTO;
import com.team04.logsheetmngsys.service.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {

    private final TopicService service;

    public TopicController(TopicService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<TopicDTO> createTopic(@RequestBody TopicDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createTopic(dto));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<TopicDTO> getTopic(@PathVariable Long id) {
        return ResponseEntity.ok(service.getTopicById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TopicDTO>> getAllTopics() {
        return ResponseEntity.ok(service.getAllTopics());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        service.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }
}
