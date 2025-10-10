package com.team04.logsheetmngsys.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.constant.ErrorCode;
import com.team04.logsheetmngsys.dto.ChangePasswordDTO;
import com.team04.logsheetmngsys.dto.StaffDTO;
import com.team04.logsheetmngsys.dto.responseDto.StaffResponseDTO;
import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.exception.CustomException;
import com.team04.logsheetmngsys.repository.RoleRepository;
import com.team04.logsheetmngsys.repository.StaffRepository;
import com.team04.logsheetmngsys.service.StaffService;

import jakarta.transaction.Transactional;

@Service
public class StaffServiceImpl implements StaffService {

	private StaffRepository staffRepository;
	private RoleRepository roleRepository;
	private BCryptPasswordEncoder passwordEncoder;
	private final EmailService emailService;
	
	@Value("${staff.failed.attempts.max}")
	private static int MAX_FAILED_ATTEMPTS;


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
		staffResponseDTO.setIsActive(staff.getIsActive());
		staffResponseDTO.setIsDeleted(staff.getIsDeleted());
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
		staff.setIsActive(dto.getIsActive());
		staff.setLastLogin(dto.getLastLogin());
		staff.setFailedAttempts(dto.getFailedAttempts());
		staff.setIsAccountLocked(dto.getIsAccountLocked());

		if (dto.getRoleId() != null) {
		    Role role = roleRepository.findById(dto.getRoleId())
		    			.orElseThrow(() -> new CustomException(
		                    ErrorCode.ROLE_NOT_FOUND.getCode(),
		                    ErrorCode.ROLE_NOT_FOUND.getMessage() + dto.getRoleId(),
		                    HttpStatus.NOT_FOUND));

		    staff.setRole(role);
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
	        throw new CustomException(
                   ErrorCode.EMAIL_ALREADY_EXISTS.getCode(),
                   ErrorCode.EMAIL_ALREADY_EXISTS.getMessage() + staffDTO.getEmail(),
                   HttpStatus.BAD_REQUEST
               );
	    }

	    Staff staff = convertToEntity(staffDTO);

	    // Set default active status if not provided in DTO
	    if (staff.getIsActive() == null) {
	        staff.setIsActive(true);
	    }

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
	        throw new 
	        CustomException(
                   ErrorCode.EMAIL_SEND_FAILURE.getCode(),
                   ErrorCode.EMAIL_SEND_FAILURE.getMessage() + staff.getEmail(),
                   HttpStatus.INTERNAL_SERVER_ERROR
               );
	    }  

	    return convertToResponseDTO(savedStaff);
	}
	 
	 @Override
	 public StaffResponseDTO patchUpdateStaff(Long id, StaffDTO staffDTO) {
	   Staff existingStaff = staffRepository.findById(id)
	             .orElseThrow(() -> new CustomException(
	                      ErrorCode.STAFF_NOT_FOUND.getCode(),
	                      ErrorCode.STAFF_NOT_FOUND.getMessage() + id,
	                      HttpStatus.NOT_FOUND
	             ));

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
	   if (staffDTO.getIsActive() != null) {
	       existingStaff.setIsActive(staffDTO.getIsActive());
	   }

	   Staff updatedStaff = staffRepository.save(existingStaff);
	   
	   StaffResponseDTO staffResponseDTO = convertToResponseDTO(updatedStaff);
	   
	   return staffResponseDTO;
	 }

	 @Override
		public StaffResponseDTO getStaffById(Long id) {
			Staff staff = staffRepository.findById(id)
					.orElseThrow(() -> new CustomException(
		                    ErrorCode.STAFF_NOT_FOUND.getCode(),
		                    ErrorCode.STAFF_NOT_FOUND.getMessage() + id,
		                    HttpStatus.NOT_FOUND
		            ));
			
			return convertToResponseDTO(staff);
		}

		@Override
		public List<StaffResponseDTO> getAllStaffs() {
			return staffRepository.findAll()
						.stream()
						.map(this::convertToResponseDTO)
						.collect(Collectors.toList());
		}

		@Override
		public void deleteStaff(Long id) {
			Staff staff = staffRepository.findById(id).orElseThrow(() -> new CustomException(
				ErrorCode.STAFF_NOT_FOUND.getCode(),
				ErrorCode.STAFF_NOT_FOUND.getMessage() + id,
				HttpStatus.NOT_FOUND
			));
			staff.setIsDeleted(true); // Soft delete
			staff.setIsActive(false); // Also mark as inactive
			staffRepository.save(staff);
		}

		@Override
		public void changePassword(Long staffId, ChangePasswordDTO changePasswordDTO) {
			Staff staff = staffRepository.findById(staffId)
					.orElseThrow(() -> new CustomException(
		                    ErrorCode.STAFF_NOT_FOUND.getCode(),
		                    ErrorCode.STAFF_NOT_FOUND.getMessage() + staffId,
		                    HttpStatus.NOT_FOUND
		            ));

			if (!changePasswordDTO.getNewPassword().equals(changePasswordDTO.getConfirmPassword())) {
				throw new CustomException(
		                ErrorCode.PASSWORD_MISMATCH.getCode(),
		                ErrorCode.PASSWORD_MISMATCH.getMessage(),
		                HttpStatus.BAD_REQUEST
				);
			}

			// verify old password
			if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), staff.getPasswordHash())) {
				throw new CustomException(
		                ErrorCode.INVALID_PASSWORD.getCode(),
		                ErrorCode.INVALID_PASSWORD.getMessage(),
		                HttpStatus.BAD_REQUEST
		            );
			}

			// set new password
			String newHashedPassword = passwordEncoder.encode(changePasswordDTO.getNewPassword());
			staff.setPasswordHash(newHashedPassword);

			staffRepository.save(staff);
		}
		
		@Override
		public StaffResponseDTO toggleStaffActiveStatus(Long id) {
			Staff staff = staffRepository.findById(id).orElseThrow(() -> new CustomException(
				ErrorCode.STAFF_NOT_FOUND.getCode(),
				ErrorCode.STAFF_NOT_FOUND.getMessage() + id,
				HttpStatus.NOT_FOUND
			));
			
			staff.setIsActive(!staff.getIsActive()); // Toggle the status
			Staff updatedStaff = staffRepository.save(staff);
			
			return convertToResponseDTO(updatedStaff);
		}

		@Override
		public StaffResponseDTO toggleAccountLockStatus(Long id) {
			Staff staff = staffRepository.findById(id).orElseThrow(() -> new CustomException(
				ErrorCode.STAFF_NOT_FOUND.getCode(),
				ErrorCode.STAFF_NOT_FOUND.getMessage() + id,
				HttpStatus.NOT_FOUND
			));
			
			staff.setIsAccountLocked(!staff.getIsAccountLocked()); // Toggle lock status
			
			// If unlocking the account, also reset failed attempts
			if (!staff.getIsAccountLocked()) {
				staff.setFailedAttempts(0);
			}
			
			Staff updatedStaff = staffRepository.save(staff);
			
			return convertToResponseDTO(updatedStaff);
		}

		@Override
		public StaffResponseDTO toggleStaffDeleteStatus(Long id) {
			Staff staff = staffRepository.findById(id).orElseThrow(() -> new CustomException(
				ErrorCode.STAFF_NOT_FOUND.getCode(),
				ErrorCode.STAFF_NOT_FOUND.getMessage() + id,
				HttpStatus.NOT_FOUND
			));
			
			boolean isNowDeleted = !staff.getIsDeleted();
			staff.setIsDeleted(isNowDeleted);
			
			// If an account is being deleted, it should be inactive.
			// If it's being restored, it should be made active.
			staff.setIsActive(!isNowDeleted);
			
			Staff updatedStaff = staffRepository.save(staff);
			
			return convertToResponseDTO(updatedStaff);
		}

		@Override
		public List<StaffResponseDTO> getAllDeletedStaffs() {
			return staffRepository.findByIsDeletedTrue()
						.stream()
						.map(this::convertToResponseDTO)
						.collect(Collectors.toList());
		}
		
		@Override
		public void resetFailedAttempts(String email) {
			Staff staff = staffRepository.findByEmail(email).orElse(null);
			
			if (staff != null) {
				staff.setFailedAttempts(0);
				staffRepository.save(staff);
			}
		}
		
		@Override
		public void handleFailedLoginAttempt(String email) {
			Staff staff = staffRepository.findByEmail(email).orElse(null);
			
			if (staff != null && !staff.getIsAccountLocked()) {
				int attempts = staff.getFailedAttempts() == null ? 0 : staff.getFailedAttempts();
				attempts++;
				staff.setFailedAttempts(attempts);
				
				if (attempts >= MAX_FAILED_ATTEMPTS) {
					staff.setIsAccountLocked(true);
				}
				staffRepository.save(staff);
			}
		}
		
		@Override
		public List<StaffResponseDTO> getAllActiveStaffs() {
			return staffRepository.findByIsActiveTrueAndIsDeletedFalse()
						.stream()
						.map(this::convertToResponseDTO)
						.collect(Collectors.toList());
		}
		
}
