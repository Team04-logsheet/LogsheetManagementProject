package com.team04.logsheetmngsys.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.PremiseDTO;
import com.team04.logsheetmngsys.entity.Premise;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.PremiseRepository;
import com.team04.logsheetmngsys.service.PremiseService;

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
				.orElseThrow(() -> new CustomException(
						ErrorCode.PREMISES_NOT_FOUND.getCode(),
                        ErrorCode.PREMISES_NOT_FOUND.getMessage() + id, 
                        HttpStatus.NOT_FOUND));
	}

	@Override
	public Premise updatePremise(Long id, PremiseDTO premisesDTO) {
		Premise existingPremise = premiseRepository.findById(id)
				.orElseThrow(() -> new CustomException(
                        ErrorCode.PREMISES_NOT_FOUND.getCode(),
                        ErrorCode.PREMISES_NOT_FOUND.getMessage() + id, 
                        HttpStatus.NOT_FOUND));

		modelMapper.map(premisesDTO, existingPremise);

		return premiseRepository.save(existingPremise);
	}

	@Override
	public void deletePremise(Long id) {
		if (!premiseRepository.existsById(id)) {
			throw new CustomException(
                    ErrorCode.PREMISES_NOT_FOUND.getCode(),
                    ErrorCode.PREMISES_NOT_FOUND.getMessage() + id, 
                    HttpStatus.NOT_FOUND);
		}
		premiseRepository.deleteById(id);
	}

}
