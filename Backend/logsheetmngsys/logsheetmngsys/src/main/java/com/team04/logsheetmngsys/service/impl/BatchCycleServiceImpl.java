package com.team04.logsheetmngsys.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.BatchCycleDTO;
import com.team04.logsheetmngsys.entity.BatchCycle;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.BatchCycleRepository;
import com.team04.logsheetmngsys.service.BatchCycleService;

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
	public BatchCycle getBatchCycleById(Long id) {
	    return batchCycleRepository.findById(id)
	            .orElseThrow(() -> new CustomException(
	                    ErrorCode.BATCH_CYCLE_NOT_FOUND.getCode(),
	                    ErrorCode.BATCH_CYCLE_NOT_FOUND.getMessage() + id,
	                    HttpStatus.NOT_FOUND
	            ));
	}

    @Override
    public BatchCycle updateBatchCycle(Long id, BatchCycleDTO batchCycleDTO) {
        BatchCycle existingBatchCycle = batchCycleRepository.findById(id)
                .orElseThrow(() -> new CustomException(
                        ErrorCode.BATCH_CYCLE_NOT_FOUND.getCode(),
                        ErrorCode.BATCH_CYCLE_NOT_FOUND.getMessage() + id,
                        HttpStatus.NOT_FOUND
                ));

        modelMapper.map(batchCycleDTO, existingBatchCycle);

        return batchCycleRepository.save(existingBatchCycle);
    }
	
    @Override
    public void deleteBatchCycle(Long id) {
        if (!batchCycleRepository.existsById(id)) {
            throw new CustomException(
                    ErrorCode.BATCH_CYCLE_NOT_FOUND.getCode(),
                    ErrorCode.BATCH_CYCLE_NOT_FOUND.getMessage() + id,
                    HttpStatus.NOT_FOUND
            );
        }
        batchCycleRepository.deleteById(id);
    }

}
