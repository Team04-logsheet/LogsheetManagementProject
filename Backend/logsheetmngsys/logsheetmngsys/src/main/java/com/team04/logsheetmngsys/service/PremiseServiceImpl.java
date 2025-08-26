package com.team04.logsheetmngsys.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.dto.PremiseDTO;
import com.team04.logsheetmngsys.entity.Premise;
import com.team04.logsheetmngsys.repository.PremiseRepository;

@Service
public class PremiseServiceImpl implements PremiseService {

	private final PremiseRepository premiseRepository;
	private final ModelMapper modelMapper;

	public PremiseServiceImpl(PremiseRepository premiseRepository, ModelMapper modelMapper) {
		this.premiseRepository = premiseRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public Premise createPremise(PremiseDTO premisesDTO) {

		Premise premise = modelMapper.map(premisesDTO, Premise.class);
		return premiseRepository.save(premise);
	}

	@Override
	public List<Premise> getAllPremises() {
		return premiseRepository.findAll();
	}

	@Override
	public Premise getPremiseById(Long id) {
		return premiseRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Premise not found with ID: " + id));
	}


	@Override
	public Premise updatePremise(Long id, PremiseDTO premisesDTO) {
		Premise existingPremise = premiseRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Premise not found with ID: " + id));

		modelMapper.map(premisesDTO, existingPremise);

		return premiseRepository.save(existingPremise);
	}

	@Override
	public void deletePremise(Long id) {
		if (!premiseRepository.existsById(id)) {
			throw new RuntimeException("Premise not found with ID: " + id);
		}
		premiseRepository.deleteById(id);
	}

}
