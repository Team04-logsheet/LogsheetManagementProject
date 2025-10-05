package com.team04.logsheetmngsys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<StaffResponseDTO> createStaff(@RequestBody StaffDTO staffDTO) {
	    StaffResponseDTO response = staffService.createStaff(staffDTO);
	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping
	public ResponseEntity<List<StaffResponseDTO>> getAllStaffs() {
	    List<StaffResponseDTO> response = staffService.getAllStaffs();
	    return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<StaffResponseDTO> getStaffById(@PathVariable Long id) {
	    StaffResponseDTO response = staffService.getStaffById(id);
	    return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<StaffResponseDTO> patchUpdateStaff(@PathVariable Long id, @RequestBody StaffDTO staffDTO) {
	    StaffResponseDTO response = staffService.patchUpdateStaff(id, staffDTO);
	    return ResponseEntity.ok(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStaff(@PathVariable Long id) {
	    staffService.deleteStaff(id);
	    return ResponseEntity.ok("Staff deleted successfully with ID: " + id);
	}

	@PutMapping("/{id}/change-password")
	public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody ChangePasswordDTO dto) {
	    staffService.changePassword(id, dto);
	    return ResponseEntity.ok("Password changed successfully for Staff ID: " + id);
	}
	
	@PatchMapping("/{id}/toggle-active")
	public ResponseEntity<StaffResponseDTO> toggleStaffActiveStatus(@PathVariable Long id) {
		StaffResponseDTO response = staffService.toggleStaffActiveStatus(id);
		return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/{id}/toggle-lock")
	public ResponseEntity<StaffResponseDTO> toggleAccountLockStatus(@PathVariable Long id) {
		StaffResponseDTO response = staffService.toggleAccountLockStatus(id);
		return ResponseEntity.ok(response);
	}
	
	@PatchMapping("/{id}/toggle-delete")
	public ResponseEntity<StaffResponseDTO> toggleStaffDeleteStatus(@PathVariable Long id) {
		StaffResponseDTO response = staffService.toggleStaffDeleteStatus(id);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<StaffResponseDTO>> getAllDeletedStaffs() {
		List<StaffResponseDTO> response = staffService.getAllDeletedStaffs();
		return ResponseEntity.ok(response);
	}
	
}
