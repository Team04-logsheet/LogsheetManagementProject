package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team04.logsheetmngsys.dto.ChangePasswordDTO;
import com.team04.logsheetmngsys.dto.StaffDTO;
import com.team04.logsheetmngsys.dto.responseDto.StaffResponseDTO;
import com.team04.logsheetmngsys.service.StaffService;

@RestController
@RequestMapping("/api/staffs")
public class StaffController {

	@Autowired
	private StaffService staffService;

	@PostMapping
	public StaffResponseDTO createStaff(@RequestBody StaffDTO staffDTO) {
		return staffService.createStaff(staffDTO);
	}

	@PatchMapping("/{id}")
	public StaffResponseDTO patchUpdateStaff(@PathVariable Long id, @RequestBody StaffDTO staffDTO) {
	    return staffService.patchUpdateStaff(id, staffDTO);
	}

	@GetMapping("/{id}")
	public StaffResponseDTO getStaffById(@PathVariable Long id) {
		return staffService.getStaffById(id);
	}

	@GetMapping
	public List<StaffResponseDTO> getAllStaffs() {
		return staffService.getAllStaffs();
	}

	@DeleteMapping("/{id}")
	public void deleteStaff(@PathVariable Long id) {
		staffService.deleteStaff(id);
	}
	
	@PutMapping("/{id}/change-password")
	public void changePassword(@PathVariable Long id, @RequestBody ChangePasswordDTO dto) {
	    staffService.changePassword(id, dto);
	}
}
