package com.homework.backend.jobapplication.service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import com.homework.backend.enums.JobApplicationStatus;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.job.response.GetAllJobsResponse;
import com.homework.backend.job.response.JobResponse;
import com.homework.backend.jobapplication.model.JobApplication;
import com.homework.backend.jobapplication.response.GetAllJobApplicationsResponse;
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

	@Autowired
	private JobRepository jobRepository;
	
	public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository, JwtService jwtService,
			Validator validator, JobRepository jobRepository) {
		super();
		this.jobApplicationRepository = jobApplicationRepository;
		this.jwtService = jwtService;
		this.validator = validator;
		this.jobRepository = jobRepository;
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

		if (jobRepository.findById(jobApplicationRequest.getJob_id()) == null) {
			throw new Exception("Job does not exists");
		}

		if (jobApplicationRequest.getApplicant_id() != currUser.getId()) {
			throw new Exception("User does not match");
		}

		JobApplication jobApplications = jobApplicationRepository.findByApplicantIdAndJobId(jobApplicationRequest.getApplicant_id(), jobApplicationRequest.getJob_id());

		if(jobApplications != null){
			throw new Exception("You have already applied!" + " " + "Job application status is: " + jobApplications.getStatus());
		}

		var jobApplication = new JobApplication(
				jobApplicationRequest.getApplicant_id(),
				jobApplicationRequest.getJob_id(),
				JobApplicationStatus.PENDING
		);

		jobApplicationRepository.save(jobApplication);
		HashMap<String, Object> jobApplicationObject = new HashMap<>();
		jobApplicationObject.put("jobApplicationObject", jobApplication);
		return new JobApplicationResponse(jobApplicationObject, "Job Applied", true);

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
	public JobApplicationResponse getAllJobApplications(HttpServletRequest request, int jobId) throws Exception {
		User currUser = this.extractUserFromRequest(request);

		Job job = jobRepository.findById(jobId);
		List<JobApplication> jobApplication = jobApplicationRepository.findAllByJobID(jobId);

		if(currUser.getId() != job.getUser_id()){
			throw new Exception("Cannot find applicants for you");
		}

		if(jobApplication == null){
			throw new Exception("Cannot find the job id");
		}

		jobApplicationRepository.findById(jobId);
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("Current Applications", jobApplication);
		return new JobApplicationResponse(jobObject, "Job found", true);

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
