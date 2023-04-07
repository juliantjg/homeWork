package com.homework.backend.notification.service;

import com.homework.backend.notification.response.NotificationResponse;

import jakarta.servlet.http.HttpServletRequest;

public interface NotificationService {
	/**
	 * Get all current user's notifications
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public NotificationResponse getCurrUserNotifications(
			HttpServletRequest request
	) throws Exception;
}
