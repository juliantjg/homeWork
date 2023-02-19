package com.homework.backend.auth.service;

import java.util.HashMap;

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

	public AuthenticationResponse register(RegisterRequest request) throws Exception {
		if (repository.existsByEmail(request.getEmail())) {
			throw new Exception("Email taken");
		}
		
		var user = new User(
				request.getFirstname(),
				request.getLastname(),
				request.getEmail(),
				passwordEncoder.encode(request.getPassword()),
				Role.USER
				);
		
		repository.save(user);
		var jwtToken = jwtService.generateToken(user);
		
		HashMap<String, Object> tokenObject = new HashMap<String, Object>();
		tokenObject.put("token", jwtToken);
		
		return new AuthenticationResponse(tokenObject, "Register successful");
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							request.getEmail(),
							request.getPassword()
							)
					);
		} catch (Exception e) {
			throw new Exception("Bad credentials");
		}
		
		var user = repository.findByEmail(request.getEmail())
				.orElseThrow();
		
		var jwtToken = jwtService.generateToken(user);
		
		HashMap<String, Object> tokenObject = new HashMap<String, Object>();
		tokenObject.put("token", jwtToken);
		
		return new AuthenticationResponse(tokenObject, "Login successful");
	}
}
