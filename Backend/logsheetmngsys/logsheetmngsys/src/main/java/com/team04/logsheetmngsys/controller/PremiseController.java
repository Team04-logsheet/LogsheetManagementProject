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

import com.team04.logsheetmngsys.dto.PremiseDTO;
import com.team04.logsheetmngsys.entity.Premise;
import com.team04.logsheetmngsys.service.PremiseService;

@RestController
@RequestMapping("/api/premises")
public class PremiseController {

	private final PremiseService premiseService;

	@Autowired
	public PremiseController(PremiseService premiseService) {
		this.premiseService = premiseService;
	}

	@PostMapping
	public ResponseEntity<Premise> createPremise(@RequestBody PremiseDTO premiseDTO) {
		Premise createdPremise = premiseService.createPremise(premiseDTO);
		return new ResponseEntity<>(createdPremise, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Premise>> getAllPremises() {
		List<Premise> premises = premiseService.getAllPremises();
		return new ResponseEntity<>(premises, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Premise> getPremiseById(@PathVariable Long id) {
		Premise premise = premiseService.getPremiseById(id);
		return new ResponseEntity<>(premise, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Premise> updatePremise(@PathVariable Long id, @RequestBody PremiseDTO premiseDTO) {
		Premise updatedPremise = premiseService.updatePremise(id, premiseDTO);
		return new ResponseEntity<>(updatedPremise, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePremise(@PathVariable Long id) {
		premiseService.deletePremise(id);
		return new ResponseEntity<>("Premise deleted successfully", HttpStatus.OK);
	}
}
