package com.homework.backend.jobapplication.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.job.request.JobRequest;
import com.homework.backend.jobapplication.repository.JobApplicationRepository;
import com.homework.backend.jobapplication.request.JobApplicationRequest;
import com.homework.backend.jobapplication.response.JobApplicationResponse;
import com.homework.backend.user.model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

	@Autowired
	private JobApplicationRepository jobApplicationRepository;
	private JwtService jwtService;
	private Validator validator;
	
	public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository, JwtService jwtService,
			Validator validator) {
		super();
		this.jobApplicationRepository = jobApplicationRepository;
		this.jwtService = jwtService;
		this.validator = validator;
	}
	
	@Override
	public JobApplicationResponse createJobApplication(
			HttpServletRequest request, 
			JobApplicationRequest jobApplicationRequest
	) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		Set<ConstraintViolation<JobApplicationRequest>> violations = validator.validate(jobApplicationRequest);
		if (!violations.isEmpty()) {
		  throw new ConstraintViolationException(violations);
		}
		
		// TODO
		
		return null;
	}
	
	@Override
	public JobApplicationResponse updateJobApplicationStatus(HttpServletRequest request,
			JobApplicationRequest jobApplicationRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		Set<ConstraintViolation<JobApplicationRequest>> violations = validator.validate(jobApplicationRequest);
		if (!violations.isEmpty()) {
		  throw new ConstraintViolationException(violations);
		}
		
		// TODO
		
		return null;
	}
	
	@Override
	public JobApplicationResponse getAllJobApplications(HttpServletRequest request) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		// TODO
		
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
