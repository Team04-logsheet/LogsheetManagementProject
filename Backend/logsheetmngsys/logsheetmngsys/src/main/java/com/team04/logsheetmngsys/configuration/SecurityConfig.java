package com.team04.logsheetmngsys.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.team04.logsheetmngsys.security.JwtAuthenticationEntryPoint;
import com.team04.logsheetmngsys.security.JwtRequestFilter;
import com.team04.logsheetmngsys.service.impl.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	private final CustomUserDetailsService userDetailsService;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtRequestFilter jwtRequestFilter;

	public SecurityConfig(CustomUserDetailsService userDetailsService,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtRequestFilter jwtRequestFilter) {
		this.userDetailsService = userDetailsService;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtRequestFilter = jwtRequestFilter;
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public DaoAuthenticationProvider authProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}
	

//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		http.csrf(csrf -> csrf.disable())
//				.authorizeHttpRequests(auth -> auth
//						// -- Publicly Accessible Endpoints --
//						.requestMatchers("/api/auth/login").permitAll()
//
//						// -- ROLE_ADMIN Access --
//						.requestMatchers("/api/batch-cycles/**").hasRole("ADMIN")
//						.requestMatchers("/api/premises/**").hasRole("ADMIN")
//						.requestMatchers("/api/course-types/**").hasRole("ADMIN")
//						.requestMatchers("/api/courses/**").hasRole("ADMIN")
//						.requestMatchers("/subjects/**").hasRole("ADMIN")
//						.requestMatchers("/sections/**").hasRole("ADMIN")
//						.requestMatchers("/topics/**").hasRole("ADMIN")
//						.requestMatchers("/api/groups/**").hasRole("ADMIN")
//						.requestMatchers("/api/menu-items/**").hasRole("ADMIN")
//						.requestMatchers("/api/roles/**").hasRole("ADMIN")
//						.requestMatchers("/api/staffs/**").hasRole("ADMIN")
//                        .requestMatchers("/api/role-menu-items/**").hasRole("ADMIN")
//						.requestMatchers("/api/logsheet-types/**").hasRole("ADMIN")
//						// Add future ADMIN endpoints here (e.g., Reports)
//
//						// -- ROLE_COURSE_COORDINATOR Access --
//						.requestMatchers("/modules/**").hasRole("COURSE_COORDINATOR")
//						.requestMatchers("/api/course-groups/**").hasRole("COURSE_COORDINATOR")
//						// Add future COURSE_COORDINATOR endpoints here (e.g., Reports, Log Approval)
//
//						// -- ROLE_STAFF Access (for future endpoints) --
//						// .requestMatchers("/api/logs/add/**").hasAnyRole("STAFF", "COURSE_COORDINATOR", "ADMIN")
//						// .requestMatchers("/api/logs/verify/**").hasAnyRole("STAFF", "COURSE_COORDINATOR", "ADMIN")
//						
//						// Fallback: Any other API request must be authenticated.
//						.anyRequest().authenticated()
//				)
//				.exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
//				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//		// Add a filter to validate the tokens with every request
//		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//
//		return http.build();
//	}
	
	 @Bean
	 public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	 http
        .csrf().disable()
        .authorizeHttpRequests()
            .anyRequest().permitAll() // allow everything
        .and()
        .httpBasic().disable(); // disable basic auth too (optional)
	
	 return http.build();
	 }

}
