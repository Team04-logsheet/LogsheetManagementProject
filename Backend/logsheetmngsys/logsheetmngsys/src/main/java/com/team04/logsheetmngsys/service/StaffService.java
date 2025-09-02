package com.team04.logsheetmngsys.service;

import java.util.List;

import com.team04.logsheetmngsys.dto.ChangePasswordDTO;
import com.team04.logsheetmngsys.dto.StaffDTO;
import com.team04.logsheetmngsys.dto.responseDto.StaffResponseDTO;

public interface StaffService {

	StaffResponseDTO createStaff(StaffDTO staffDTO);

	StaffResponseDTO getStaffById(Long id);

	List<StaffResponseDTO> getAllStaffs();

	void deleteStaff(Long id);
	
    void changePassword(Long staffId, ChangePasswordDTO changePasswordDTO);

	StaffResponseDTO patchUpdateStaff(Long id, StaffDTO staffDTO);


}