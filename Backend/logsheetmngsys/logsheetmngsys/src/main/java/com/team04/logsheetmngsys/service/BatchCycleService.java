package com.team04.logsheetmngsys.service;

import java.util.List;
import java.util.Optional;

import com.team04.logsheetmngsys.dto.BatchCycleDTO;
import com.team04.logsheetmngsys.entity.BatchCycle;

public interface BatchCycleService {

	BatchCycle createBatchCycle(BatchCycleDTO batchCycleDTO);

	List<BatchCycle> getAllBatchCycles();

	BatchCycle getBatchCycleById(Long id);

	BatchCycle updateBatchCycle(Long id, BatchCycleDTO batchCycleDTO);

	void deleteBatchCycle(Long id);

}