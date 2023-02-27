package com.homework.backend.auth.service;

import com.homework.backend.auth.request.AuthenticationRequest;
import com.homework.backend.auth.request.RegisterRequest;
import com.homework.backend.auth.response.AuthenticationResponse;

public interface AuthenticationService {
	/**
	 * Register service
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public AuthenticationResponse register(RegisterRequest request) throws Exception;
	
	/**
	 * Login service
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception;
}
