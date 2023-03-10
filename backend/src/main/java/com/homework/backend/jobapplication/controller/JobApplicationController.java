package com.homework.backend.jobapplication.controller;

import com.homework.backend.jobapplication.request.UpdateJobApplicationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> update(
		HttpServletRequest request,
		@PathVariable("id") int id,
		@RequestBody UpdateJobApplicationRequest jobApplicationRequest
	) {
		try {
			return ResponseEntity.ok(service.updateJobApplicationStatus(request, id, jobApplicationRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobApplicationResponse(null, e.getMessage(), false));
		}
	}
	
	@GetMapping("/all/{job_id}")
	public ResponseEntity<?> all(
		HttpServletRequest request,
		@PathVariable("job_id") int jobID
	) {
		try {
			return ResponseEntity.ok(service.getAllJobApplications(request, jobID));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobApplicationResponse(null, e.getMessage(), false));
		}
	}
}
