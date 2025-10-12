package com.team04.logsheetmngsys.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
	

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // -- Publicly Accessible Endpoints --
                .requestMatchers("/api/auth/login").permitAll()
                
                // Permit all GET requests for viewing data across all controllers
                .requestMatchers(HttpMethod.GET,
                    "/api/batch-cycles/**",
                    "/api/courses/**",
                    "/api/course-coordinators/**",
                    "/api/course-groups/**",
                    "/api/course-modules/**",
                    "/api/course-types/**",
                    "/api/groups/**",
                    "/api/logs/**",
                    "/api/logsheet-types/**",
                    "/api/menu-items/**",
                    "/api/modules/**",
                    "/api/module-routers/**",
                    "/api/module-subjects/**",
                    "/api/premises/**",
                    "/api/roles/**",
                    "/api/role-menu-items/**",
                    "/sections/**",
                    "/api/staffs/**",
                    "/subjects/**",
                    "/topics/**"
                ).permitAll()

                // -- ROLE_ADMIN Access --
                // Endpoints where only ADMIN can create, update, or delete
                .requestMatchers(
                    "/api/batch-cycles/**",
                    "/api/courses/**",
                    "/api/course-coordinators/**",
                    "/api/course-types/**",
                    "/api/groups/**",
                    "/api/logsheet-types/**",
                    "/api/menu-items/**",
                    "/api/premises/**",
                    "/api/roles/**",
                    "/api/role-menu-items/**",
                    "/sections/**",
                    "/subjects/**",
                    "/topics/**"
                ).hasRole("ADMIN")
                // Staff management is ADMIN-only, except for password change
                .requestMatchers(HttpMethod.POST, "/api/staffs").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/staffs/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/staffs/**").hasRole("ADMIN")

                // -- ROLE_COURSE_COORDINATOR Access --
                .requestMatchers("/api/course-groups/**").hasRole("COURSE_COORDINATOR")
                .requestMatchers("/api/modules/**").hasRole("COURSE_COORDINATOR")
                .requestMatchers(HttpMethod.PATCH, "/api/logs/*/approve").hasRole("COURSE_COORDINATOR")

                // -- ROLE_MODULE_ROUTER Access --
                .requestMatchers(HttpMethod.PATCH, "/api/logs/*/verify").hasRole("MODULE_ROUTER")

                // -- ADMIN or COURSE_COORDINATOR Access --
                .requestMatchers(
                    "/api/course-modules/**",
                    "/api/module-routers/**",
                    "/api/module-subjects/**"
                ).hasAnyRole("ADMIN", "COURSE_COORDINATOR")

                // -- Authenticated User Access (Multiple Roles) --
                // Log creation, updating, and deletion by any valid role
                .requestMatchers(HttpMethod.POST, "/api/logs").hasAnyRole("ADMIN", "MODULE_ROUTER", "COURSE_COORDINATOR", "STAFF", "MENTOR")
                .requestMatchers(HttpMethod.PUT, "/api/logs/**").hasAnyRole("ADMIN", "MODULE_ROUTER", "COURSE_COORDINATOR", "STAFF", "MENTOR")
                .requestMatchers(HttpMethod.DELETE, "/api/logs/**").hasAnyRole("ADMIN", "MODULE_ROUTER", "COURSE_COORDINATOR", "STAFF", "MENTOR")
                
                // Any authenticated user can change their own password
                .requestMatchers(HttpMethod.PUT, "/api/staffs/*/change-password").authenticated()

                // -- Fallback Rule --
                // Any other request not specified above must be authenticated.
                .anyRequest().authenticated()
//                .anyRequest().permitAll()
            )
            .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Add a filter to validate the tokens with every request
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
	
//	 @Bean
//	 public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//	 http
//        .csrf().disable()
//        .authorizeHttpRequests()
//            .anyRequest().permitAll() // allow everything
//        .and()
//        .httpBasic().disable(); // disable basic auth too (optional)
//	
//	 return http.build();
//	 }
	
	
	// ✅ Add this bean for CORS configuration
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true); // allow cookies/tokens
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

}
