package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.team04.logsheetmngsys.dto.BatchCycleRequestDTO;
import com.team04.logsheetmngsys.entity.BatchCycle;
import com.team04.logsheetmngsys.service.BatchCycleService;

@RestController
@RequestMapping("/api/batch-cycles")
public class BatchCycleController {

	private final BatchCycleService batchCycleService;

	@Autowired
	public BatchCycleController(BatchCycleService batchCycleService) {
		this.batchCycleService = batchCycleService;
	}

	@PostMapping
	public ResponseEntity<BatchCycle> createBatchCycle(@RequestBody BatchCycleRequestDTO batchCycleDTO) {
		BatchCycle createdBatchCycle = batchCycleService.createBatchCycle(batchCycleDTO);
		return new ResponseEntity<>(createdBatchCycle, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<BatchCycle>> getAllBatchCycles() {
		List<BatchCycle> batchCycles = batchCycleService.getAllBatchCycles();
		return new ResponseEntity<>(batchCycles, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<BatchCycle> getBatchCycleById(@PathVariable Long id) {
		BatchCycle batchCycle = batchCycleService.getBatchCycleById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "BatchCycle not found with ID: " + id));
		return new ResponseEntity<>(batchCycle, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<BatchCycle> updateBatchCycle(@PathVariable Long id,
			@RequestBody BatchCycleRequestDTO batchCycleDTO) {
		BatchCycle updatedBatchCycle = batchCycleService.updateBatchCycle(id, batchCycleDTO);
		return new ResponseEntity<>(updatedBatchCycle, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBatchCycle(@PathVariable Long id) {
		batchCycleService.deleteBatchCycle(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content indicates successful deletion with no body
	}
}