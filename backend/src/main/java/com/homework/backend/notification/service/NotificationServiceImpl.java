package com.homework.backend.notification.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.notification.repository.NotificationRepository;
import com.homework.backend.notification.response.NotificationResponse;
import com.homework.backend.user.model.User;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class NotificationServiceImpl implements NotificationService {
	
	@Autowired
	private NotificationRepository notificationRepository;
	private JwtService jwtService;
	
	public NotificationServiceImpl(NotificationRepository notificationRepository, JwtService jwtService) {
		super();
		this.notificationRepository = notificationRepository;
		this.jwtService = jwtService;
	}

	@Override
	public NotificationResponse getCurrUserNotifications(HttpServletRequest request) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * Helper function to get user from request
	 * @param request
	 * @return
	 */
	private User extractUserFromRequest(HttpServletRequest request) {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		jwt = authHeader.substring(7);
		return jwtService.extractUser(jwt);
	}
}
