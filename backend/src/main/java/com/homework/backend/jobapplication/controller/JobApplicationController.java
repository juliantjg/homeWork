package com.homework.backend.jobapplication.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homework.backend.jobapplication.request.JobApplicationRequest;
import com.homework.backend.jobapplication.response.JobApplicationResponse;
import com.homework.backend.jobapplication.service.JobApplicationService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/jobapplication")
public class JobApplicationController {
	private final JobApplicationService service;

	public JobApplicationController(JobApplicationService service) {
		super();
		this.service = service;
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> create(
		HttpServletRequest request, 
		@RequestBody JobApplicationRequest jobApplicationRequest
	) {
		try {
			return ResponseEntity.ok(service.createJobApplication(request, jobApplicationRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobApplicationResponse(null, e.getMessage(), false));
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(
		HttpServletRequest request, 
		@RequestBody JobApplicationRequest jobApplicationRequest
	) {
		try {
			return ResponseEntity.ok(service.updateJobApplicationStatus(request, jobApplicationRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobApplicationResponse(null, e.getMessage(), false));
		}
	}
	
	@PutMapping("/all")
	public ResponseEntity<?> all(
		HttpServletRequest request,
		@PathVariable("id") int id
	) {
		try {
			return ResponseEntity.ok(service.getAllJobApplications(request, id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobApplicationResponse(null, e.getMessage(), false));
		}
	}
}
