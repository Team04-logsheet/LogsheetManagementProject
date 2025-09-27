package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.LogsheetTypeDTO;
import com.team04.logsheetmngsys.entity.LogsheetType;

public interface LogsheetTypeService {

	LogsheetType createLogsheetType(LogsheetTypeDTO dto);

	List<LogsheetType> getAllLogsheetTypes();

	LogsheetType getLogsheetTypeById(Long id);

	LogsheetType updateLogsheetType(Long id, LogsheetTypeDTO dto);

	void deleteLogsheetType(Long id);

}