package com.homework.backend.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.homework.backend.auth.request.AuthenticationRequest;
import com.homework.backend.auth.request.RegisterRequest;
import com.homework.backend.auth.response.AuthenticationResponse;
import com.homework.backend.config.service.JwtService;
import com.homework.backend.enums.Role;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	
	
	
	public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService,
			AuthenticationManager authenticationManager) {
		super();
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	public AuthenticationResponse register(RegisterRequest request) {
//		var user = User(request.getFirstname())
//				.setFirstname(request.getFirstname())
//				.lastname(request.getLastname())
//				.email(request.getEmail())
//				.password(PasswordEncoder.encode(request.getPassword()))
//				.role(Role.USER)
//				.build();
		
		var user = new User(
				request.getFirstname(),
				request.getLastname(),
				request.getEmail(),
				passwordEncoder.encode(request.getPassword()),
				Role.USER
				);
				
		repository.save(user);
		var jwtToken = jwtService.generateToken(user);
//		return AuthenticationResponse.builder()
//				.token(jwtToken)
//				.build();
		
		return new AuthenticationResponse(jwtToken);
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
						)
				);
		var user = repository.findByEmail(request.getEmail())
				.orElseThrow();
		var jwtToken = jwtService.generateToken(user);
//		return AuthenticationResponse.builder()
//				.token(jwtToken)
//				.build();
		
		return new AuthenticationResponse(jwtToken);
	}
}
