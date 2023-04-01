package com.homework.backend.user.service;

import com.homework.backend.user.response.UserResponse;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
	
	/**
	 * Get one user details
	 * @param request
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public UserResponse read(
			HttpServletRequest request,
			int userId
	) throws Exception;
}
