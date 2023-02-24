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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/job")
public class JobController {
	
	private final JobService service;
	
	public JobController(JobService service) {
		super();
		this.service = service;
	}

	@GetMapping("/all")
	public ResponseEntity<?> all() {
		try {
			return ResponseEntity.ok(service.getAllJobs());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage()));
		}
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> create(
		@RequestBody JobRequest request
	) {
		try {
			return ResponseEntity.ok(service.createJob(request));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage()));
		}
	}
	
	@GetMapping("/read/{id}")
	public ResponseEntity<?> read(
		@PathVariable("id") int id
	) {
		try {
			return ResponseEntity.ok(service.readJob(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage()));
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<?> update(
		@PathVariable("id") int id,
		@RequestBody JobRequest request
	) {
		try {
			return ResponseEntity.ok(service.updateJob(id, request));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(
		@PathVariable("id") int id
	) {
		try {
			return ResponseEntity.ok(service.deleteJob(id));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new JobResponse(null, e.getMessage()));
		}
	}
}
