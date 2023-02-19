package com.homework.backend.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.homework.backend.config.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private final JwtService jwtService;
	private final UserDetailsService userDetailsService;
	
	

	public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
		super();
		this.jwtService = jwtService;
		this.userDetailsService = userDetailsService;
	}



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
		
		// Use SecurityContextHolder to check whether the user has been authenticated or not
		if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			// If user hasn't yet authenticate (also email isn't null)
			// Then we can check if the user exist in the database
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
			if (jwtService.isTokenValid(jwt,  userDetails)) {
				// Now if the token is valid, we need to update the security context and send the request to the dispatcher
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
					userDetails,
					null,
					userDetails.getAuthorities()
				);
				authToken.setDetails(
					new WebAuthenticationDetailsSource().buildDetails(request)
				);
				
				// Finally, we update the security context holder
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		filterChain.doFilter(request, response);
	}

}
