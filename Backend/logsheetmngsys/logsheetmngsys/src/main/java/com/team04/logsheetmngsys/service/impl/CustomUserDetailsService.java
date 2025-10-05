package com.team04.logsheetmngsys.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.team04.logsheetmngsys.entity.MenuItem;
import com.team04.logsheetmngsys.entity.Role;
import com.team04.logsheetmngsys.entity.RoleMenuItem;
import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.repository.RoleMenuItemRepository;
import com.team04.logsheetmngsys.repository.StaffRepository;
import com.team04.logsheetmngsys.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final StaffRepository staffRepository;
	private final RoleMenuItemRepository roleMenuItemRepository;

	public CustomUserDetailsService(StaffRepository staffRepository, RoleMenuItemRepository roleMenuItemRepository) {
		this.staffRepository = staffRepository;
		this.roleMenuItemRepository = roleMenuItemRepository;
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
		// First, add the role name itself as an authority (e.g., "ROLE_ADMIN")
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(role.getName()));

		// Second, fetch all menu item paths associated with this role
		List<RoleMenuItem> roleMenuItems = roleMenuItemRepository.findByRoleId(role.getId());

		List<GrantedAuthority> pathAuthorities = roleMenuItems.stream()
				.map(RoleMenuItem::getMenuItem)
				.map(MenuItem::getPath)
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

		authorities.addAll(pathAuthorities);

		return authorities;
	}
}
