package com.homework.backend.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homework.backend.auth.request.AuthenticationRequest;
import com.homework.backend.auth.request.RegisterRequest;
import com.homework.backend.auth.response.AuthenticationResponse;
import com.homework.backend.auth.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService service;
	
	
	
	public AuthenticationController(AuthenticationService service) {
		super();
		this.service = service;
	}

	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(
		@RequestBody RegisterRequest request
	) {
		AuthenticationResponse response = service.register(request);
		return ResponseEntity.ok(service.register(request));
//		System.out.println("asda");
//		return ResponseEntity.ok(null);
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(
		@RequestBody AuthenticationRequest request
	) {
		return ResponseEntity.ok(service.authenticate(request));
	}
	
}
