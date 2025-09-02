package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.dto.ChangePasswordDTO;
import com.team04.logsheetmngsys.dto.StaffDTO;
import com.team04.logsheetmngsys.dto.responseDto.StaffResponseDTO;
import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.repository.RoleRepository;
import com.team04.logsheetmngsys.repository.StaffRepository;
import com.team04.logsheetmngsys.service.EmailService;
import com.team04.logsheetmngsys.service.StaffService;

import jakarta.transaction.Transactional;

@Service
public class StaffServiceImpl implements StaffService {

	private StaffRepository staffRepository;
	private RoleRepository roleRepository;
	private BCryptPasswordEncoder passwordEncoder;
	private final EmailService emailService;

	@Autowired
	public StaffServiceImpl(StaffRepository staffRepository, RoleRepository roleRepository,
			BCryptPasswordEncoder passwordEncoder, EmailService emailService) {
		this.staffRepository = staffRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.emailService = emailService;
	}

	private StaffResponseDTO convertToResponseDTO(Staff staff) {
		StaffResponseDTO staffResponseDTO = new StaffResponseDTO();
		staffResponseDTO.setId(staff.getId());
		staffResponseDTO.setFirstName(staff.getFirstName());
		staffResponseDTO.setLastName(staff.getLastName());
		staffResponseDTO.setEmail(staff.getEmail());
		staffResponseDTO.setContact(staff.getContact());
		staffResponseDTO.setStaffType(staff.getStaffType());
		staffResponseDTO.setRoleId(staff.getRole() != null ? staff.getRole().getId() : null);
		staffResponseDTO.setActivityStatus(staff.getActivityStatus());
		staffResponseDTO.setLastLogin(staff.getLastLogin());
		staffResponseDTO.setFailedAttempts(staff.getFailedAttempts());
		staffResponseDTO.setIsAccountLocked(staff.getIsAccountLocked());
		staffResponseDTO.setCreatedAt(staff.getCreatedAt());
		staffResponseDTO.setUpdatedAt(staff.getUpdatedAt());
		return staffResponseDTO;
	}

	private Staff convertToEntity(StaffDTO dto) {
		Staff staff = new Staff();
		staff.setFirstName(dto.getFirstName());
		staff.setLastName(dto.getLastName());
		staff.setEmail(dto.getEmail());
		staff.setContact(dto.getContact());
		staff.setStaffType(dto.getStaffType());
		staff.setActivityStatus(dto.getActivityStatus());
		staff.setLastLogin(dto.getLastLogin());
		staff.setFailedAttempts(dto.getFailedAttempts());
		staff.setIsAccountLocked(dto.getIsAccountLocked());

		if (dto.getRoleId() != null) {
			roleRepository.findById(dto.getRoleId()).ifPresent(staff::setRole);
		}
		return staff;
	}

	/**
	 * Generate default password for a new staff based on firstName, lastName, and
	 * contact
	 */
	private String generateDefaultPassword(Staff staff) {
		String firstName = staff.getFirstName().toLowerCase();
		String lastName = staff.getLastName().toLowerCase();
		String contact = staff.getContact();

		// Take last 4 digits of contact
		String contactSuffix = contact.substring(contact.length() - 4);

		return firstName + "@" + lastName + contactSuffix;
	}

	 @Transactional
	    @Override
	    public StaffResponseDTO createStaff(StaffDTO staffDTO) {
		 
	        //Check if email already exists
	        Optional<Staff> existingStaff = staffRepository.findByEmail(staffDTO.getEmail());
	        if (existingStaff.isPresent()) {
	            throw new RuntimeException("User with email " + staffDTO.getEmail() + " already exists.");
	        }

	        Staff staff = convertToEntity(staffDTO);

	        String rawPassword = generateDefaultPassword(staff);
	        String hashedPassword = passwordEncoder.encode(rawPassword);
	        staff.setPasswordHash(hashedPassword);

	        Staff savedStaff = staffRepository.save(staff);

	        try {
	            emailService.sendEmail(
	                staff.getEmail(),
	                "Welcome to Logsheet System",
	                "Hello " + staff.getFirstName() + ",\n\n" +
	                "Your account has been created.\n" +
	                "Username: " + staff.getEmail() + "\n" +
	                "Password: " + rawPassword + "\n\n" +
	                "Please change your password after first login."
	            );
	        } catch (Exception e) {
	            // Email failed → rollback DB insert
	            throw new RuntimeException("Failed to send email. Transaction rolled back.", e);
	        }

	        return convertToResponseDTO(savedStaff);
	    }
	 
	 @Override
	 public StaffResponseDTO patchUpdateStaff(Long id, StaffDTO staffDTO) {
	     Staff existingStaff = staffRepository.findById(id)
	             .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));

	     // Only update provided fields
	     if (staffDTO.getFirstName() != null) {
	         existingStaff.setFirstName(staffDTO.getFirstName());
	     }
	     if (staffDTO.getLastName() != null) {
	         existingStaff.setLastName(staffDTO.getLastName());
	     }
	     if (staffDTO.getEmail() != null) {
	         existingStaff.setEmail(staffDTO.getEmail());
	     }
	     if (staffDTO.getContact() != null) {
	         existingStaff.setContact(staffDTO.getContact());
	     }
	     if (staffDTO.getStaffType() != null) {
	         existingStaff.setStaffType(staffDTO.getStaffType());
	     }
	     if (staffDTO.getRoleId() != null) {
	    	 Optional<Role> newRole = roleRepository.findById(staffDTO.getRoleId());
	    	 if (newRole.isPresent()) {
	    		 existingStaff.setRole(newRole.get());
	    	 }
	     }
	     if (staffDTO.getActivityStatus() != null) {
	         existingStaff.setActivityStatus(staffDTO.getActivityStatus());
	     }


	     Staff updatedStaff = staffRepository.save(existingStaff);
	     
	     StaffResponseDTO staffResponseDTO = convertToResponseDTO(updatedStaff);
	     
	     return staffResponseDTO;
	 }

	@Override
	public StaffResponseDTO getStaffById(Long id) {
		Staff staff = staffRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Staff not found with id " + id));
		return convertToResponseDTO(staff);
	}

	@Override
	public List<StaffResponseDTO> getAllStaffs() {
		return staffRepository.findAll().stream().map(this::convertToResponseDTO).collect(Collectors.toList());
	}

	@Override
	public void deleteStaff(Long id) {
		staffRepository.deleteById(id);
	}

	@Override
	public void changePassword(Long staffId, ChangePasswordDTO changePasswordDTO) {
		Staff staff = staffRepository.findById(staffId)
				.orElseThrow(() -> new RuntimeException("Staff not found with id " + staffId));

		if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())) {
			throw new RuntimeException("New password and confirm password do not match");
		}

		// verify old password
		if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), staff.getPasswordHash())) {
			throw new RuntimeException("Old password does not match");
		}

		// set new password
		String newHashedPassword = passwordEncoder.encode(changePasswordDTO.getNewPassword());
		staff.setPasswordHash(newHashedPassword);

		staffRepository.save(staff);
	}
}
