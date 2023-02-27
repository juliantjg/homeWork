package com.homework.backend.job.service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.job.request.JobRequest;
import com.homework.backend.job.response.GetAllJobsResponse;
import com.homework.backend.job.response.JobResponse;
import com.homework.backend.user.model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;

@Service
public class JobServiceImpl implements JobService {
	
	@Autowired
	private JobRepository jobRepository;
	private JwtService jwtService;
	private Validator validator;

	private Job jobs;

	public JobServiceImpl(JobRepository jobRepository, JwtService jwtService, Validator validator) {
		this.jobRepository = jobRepository;
		this.jwtService = jwtService;
		this.validator = validator;
	}

	@Override
	public GetAllJobsResponse getAllJobs(HttpServletRequest request) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		List<Job> jobs = jobRepository.findAll();
		return new GetAllJobsResponse(jobs, "Register successful", true);
	}

	@Override
	public JobResponse createJob(HttpServletRequest request, JobRequest jobRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		Set<ConstraintViolation<JobRequest>> violations = validator.validate(jobRequest);
		if (!violations.isEmpty()) {
		  throw new ConstraintViolationException(violations);
		}
		
		var job = new Job(
				jobRequest.getTitle(),
				jobRequest.getDescription(),
				jobRequest.getSalary(),
				jobRequest.getLocation(),
				jobRequest.getPostcode(),
				currUser.getId()
		);

		jobRepository.save(job);
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("job", job);
		return new JobResponse(jobObject, "Job created successfully.", true);
	}

	@Override
	public JobResponse readJob(HttpServletRequest request, int id) throws Exception { // read job by ID
		User currUser = this.extractUserFromRequest(request);
		Job job = jobRepository.findById(id);

		if(job == null){
			throw new Exception("Cannot find the job ID");
		}

		jobRepository.findById(id);
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("job", job);
		return new JobResponse(jobObject, "Job found", true);
	}

	@Override
	public JobResponse updateJob(HttpServletRequest request, int id, JobRequest jobRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		Job job = jobRepository.findById(id);

		if(job == null){
			throw new Exception("Cannot find the job ID");
		}
		if (currUser.getId() != job.getUser_id()){
			throw new Exception("User ID does not match");
		}

		job.setTitle(jobRequest.getTitle());
		job.setDescription(jobRequest.getDescription());
		job.setSalary(jobRequest.getSalary());
		job.setLocation(jobRequest.getLocation());
		job.setPostcode(jobRequest.getPostcode());

		jobRepository.save(job);
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("job", job);
		return new JobResponse(jobObject, "Job updated successfully.", true);
	}

	@Override
	public JobResponse deleteJob(HttpServletRequest request, int id) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		Job job;

		job = jobRepository.findById(id);

		if(job == null){
			throw new Exception("Cannot find the job ID");
		}
		if (currUser.getId() != job.getUser_id()){
			throw new Exception("User ID does not match");
		}
		jobRepository.deleteById(id);
		return new JobResponse(null, "Job deleted successfully.", true);
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
