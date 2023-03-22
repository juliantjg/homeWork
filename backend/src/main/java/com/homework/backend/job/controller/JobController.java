package com.homework.backend.job.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homework.backend.job.request.JobRequest;
import com.homework.backend.job.response.JobResponse;
import com.homework.backend.job.service.JobService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/job")
public class JobController {
	
	private final JobService service;
	
	public JobController(JobService service) {
		super();
		this.service = service;
	}

	@GetMapping("/all")
	public ResponseEntity<?> all(
		HttpServletRequest request
	) {
		try {
			return ResponseEntity.ok(service.getAllJobs(request));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage(), false));
		}
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> create(
		HttpServletRequest request, 
		@RequestBody JobRequest jobRequest
	) {
		try {
			return ResponseEntity.ok(service.createJob(request, jobRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage(), false));
		}
	}
	
	@GetMapping("/read/{id}")
	public ResponseEntity<?> read(
		HttpServletRequest request,
		@PathVariable("id") int id
	) {
		try {
			return ResponseEntity.ok(service.readJob(request, id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage(), false));
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> update(
		HttpServletRequest request,
		@PathVariable("id") int id,
		@RequestBody JobRequest jobRequest
	) {
		try {
			return ResponseEntity.ok(service.updateJob(request, id, jobRequest));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage(), false));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(
		HttpServletRequest request,
		@PathVariable("id") int id
	) {
		try {
			return ResponseEntity.ok(service.deleteJob(request, id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage(), false));
		}
	}
}
