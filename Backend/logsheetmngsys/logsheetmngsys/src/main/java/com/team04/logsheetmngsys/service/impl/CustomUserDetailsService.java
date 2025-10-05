package com.team04.logsheetmngsys.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.repository.StaffRepository;
import com.team04.logsheetmngsys.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final StaffRepository staffRepository;

	public CustomUserDetailsService(StaffRepository staffRepository) {
		this.staffRepository = staffRepository;
	}

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Staff staff = staffRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Staff not found with email: " + email));

		if (staff.getRole() == null) {
			throw new UsernameNotFoundException("Staff has no role assigned: " + email);
		}

		Collection<GrantedAuthority> authorities = getAuthorities(staff.getRole());

		return new CustomUserDetails(
				staff.getEmail(),
				staff.getPasswordHash(),
				staff.getFirstName(),
				staff.getLastName(), 
				authorities);
	}

	private Collection<GrantedAuthority> getAuthorities(Role role) {
		List<GrantedAuthority> authorities = new ArrayList<>();
        // The only authority is now the role's name, prefixed with "ROLE_"
		authorities.add(new SimpleGrantedAuthority(role.getName().toUpperCase()));
		return authorities;
	}
}
