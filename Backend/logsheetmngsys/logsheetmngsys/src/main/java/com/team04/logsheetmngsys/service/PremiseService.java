package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.PremiseDTO;
import com.team04.logsheetmngsys.entity.Premise;

public interface PremiseService {

	Premise createPremise(PremiseDTO premisesDTO);

	List<Premise> getAllPremises();

	Premise getPremiseById(Long id);

	Premise updatePremise(Long id, PremiseDTO premisesDTO);

	void deletePremise(Long id);

}