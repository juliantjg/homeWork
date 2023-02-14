package com.homework.backend.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.homework.backend.config.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtService jwtService;

	@Override
	protected void doFilterInternal(
		@NonNull HttpServletRequest request, 
		@NonNull HttpServletResponse response, 
		@NonNull FilterChain filterChain
	) throws ServletException, IOException {
		// Fetch auth token from request
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String userEmail;
		
		// 1. Start with extracting the JSON token
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			// Check whether the token is valid (e.g. starts with Bearer. Otherwise just return
			filterChain.doFilter(request, response);
			return;
		}
		// Substring 7 since after "Bearer " the token string starting index is 7
		jwt = authHeader.substring(7);
		
		// 2. Now we check the user email
		userEmail = jwtService.extractUsername(jwt);
	}

}