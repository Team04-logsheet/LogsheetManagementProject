package com.team04.logsheetmngsys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.team04.logsheetmngsys.entity.Staff;
import com.team04.logsheetmngsys.repository.StaffRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return User.builder()
                .username(staff.getEmail())
                .password(staff.getPasswordHash())  // hashed password
                .roles(staff.getRole() != null ? staff.getRole().getTitle() : "USER")
                .build();
    }
}
