package com.homework.backend.notification.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homework.backend.jobapplication.response.JobApplicationResponse;
import com.homework.backend.notification.service.NotificationService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notification")
public class NotificationController {
	private final NotificationService service;
	
	public NotificationController(NotificationService service) {
		super();
		this.service = service;
	}

	@GetMapping("/")
	public ResponseEntity<?> all(
		HttpServletRequest request
	) {
		try {
			return ResponseEntity.ok(service.getCurrUserNotifications(request));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobApplicationResponse(null, e.getMessage(), false));
		}
	}
}
