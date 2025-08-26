package com.team04.logsheetmngsys.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.team04.logsheetmngsys.dto.BatchCycleDTO;
import com.team04.logsheetmngsys.entity.BatchCycle;
import com.team04.logsheetmngsys.repository.BatchCycleRepository;

@Service
public class BatchCycleServiceImpl implements BatchCycleService {

	private final BatchCycleRepository batchCycleRepository;
	private final ModelMapper modelMapper;

	@Autowired
	public BatchCycleServiceImpl(BatchCycleRepository batchCycleRepository, ModelMapper modelMapper) {
		this.batchCycleRepository = batchCycleRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public BatchCycle createBatchCycle(BatchCycleDTO batchCycleDTO) {
		BatchCycle batchCycle = modelMapper.map(batchCycleDTO, BatchCycle.class);
		return batchCycleRepository.save(batchCycle);
	}

	@Override
	public List<BatchCycle> getAllBatchCycles() {
		return batchCycleRepository.findAll();
	}

	@Override
	public Optional<BatchCycle> getBatchCycleById(Long id) {
		return batchCycleRepository.findById(id);
	}

	@Override
	public BatchCycle updateBatchCycle(Long id, BatchCycleDTO batchCycleDTO) {
		BatchCycle existingBatchCycle = batchCycleRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "BatchCycle not found with ID: " + id));

		modelMapper.map(batchCycleDTO, existingBatchCycle);

		return batchCycleRepository.save(existingBatchCycle);
	}
	
	@Override
	public void deleteBatchCycle(Long id) {
		if (!batchCycleRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "BatchCycle not found with ID: " + id);
		}
		batchCycleRepository.deleteById(id);
	}

}
