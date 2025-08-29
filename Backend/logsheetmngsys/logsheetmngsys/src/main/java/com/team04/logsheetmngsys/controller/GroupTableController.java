package com.team04.logsheetmngsys.controller;

import com.team04.logsheetmngsys.dto.GroupTableDTO;
import com.team04.logsheetmngsys.service.GroupTableService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupTableController {

    private final GroupTableService service;

    public GroupTableController(GroupTableService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<GroupTableDTO> createGroup(@RequestBody GroupTableDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createGroup(dto));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GroupTableDTO> updateGroup(@PathVariable Long id, @RequestBody GroupTableDTO dto) {
        return ResponseEntity.ok(service.updateGroup(id, dto));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<GroupTableDTO> getGroup(@PathVariable Long id) {
        return ResponseEntity.ok(service.getGroupById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<GroupTableDTO>> getAllGroups() {
        return ResponseEntity.ok(service.getAllGroups());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        service.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }
}