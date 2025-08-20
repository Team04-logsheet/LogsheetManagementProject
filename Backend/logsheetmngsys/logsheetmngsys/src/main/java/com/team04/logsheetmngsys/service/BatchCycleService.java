package com.team04.logsheetmngsys.service;

import java.util.List;
import java.util.Optional;

import com.team04.logsheetmngsys.dto.BatchCycleRequestDTO;
import com.team04.logsheetmngsys.entity.BatchCycle;

public interface BatchCycleService {

	BatchCycle createBatchCycle(BatchCycleRequestDTO batchCycleDTO);

	List<BatchCycle> getAllBatchCycles();

	Optional<BatchCycle> getBatchCycleById(Long id);

	BatchCycle updateBatchCycle(Long id, BatchCycleRequestDTO batchCycleDTO);

	void deleteBatchCycle(Long id);

}