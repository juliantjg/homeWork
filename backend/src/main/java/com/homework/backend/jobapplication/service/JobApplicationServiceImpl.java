package com.homework.backend.jobapplication.service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.enums.JobApplicationStatus;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.jobapplication.dto.GetApplicationListPerJobDTO;
import com.homework.backend.jobapplication.mapper.JobApplicationMapper;
import com.homework.backend.jobapplication.model.JobApplication;
import com.homework.backend.jobapplication.repository.JobApplicationRepository;
import com.homework.backend.jobapplication.request.JobApplicationRequest;
import com.homework.backend.jobapplication.request.UpdateJobApplicationRequest;
import com.homework.backend.jobapplication.response.JobApplicationResponse;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;

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
	@Autowired
	private UserRepository userRepository;
	
	public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository, JwtService jwtService,
			Validator validator, JobRepository jobRepository, UserRepository userRepository) {
		super();
		this.jobApplicationRepository = jobApplicationRepository;
		this.jwtService = jwtService;
		this.validator = validator;
		this.jobRepository = jobRepository;
		this.userRepository = userRepository;
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
			int id, UpdateJobApplicationRequest updateJobApplicationRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		Set<ConstraintViolation<UpdateJobApplicationRequest>> violations = validator.validate(updateJobApplicationRequest);
		if (!violations.isEmpty()) {
		  throw new ConstraintViolationException(violations);
		}

		JobApplication jobApplication = jobApplicationRepository.findById(id);

		if(jobApplication == null){
			throw new Exception("Application does not exist");
		}

		Job job = jobRepository.findById(jobApplication.getJob_id());

		if(currUser.getId() != job.getUser_id()){
			throw new Exception("Unauthorized! Access denied");
		}

		if(jobApplication.getStatus() == JobApplicationStatus.ACCEPTED || jobApplication.getStatus() == JobApplicationStatus.REJECTED){
			throw new Exception("Cannot change application status. Application is " + jobApplication.getStatus());
		}

		jobApplication.setStatus(updateJobApplicationRequest.getStatus());
		jobApplicationRepository.save(jobApplication);

		HashMap<String, Object> jobApplicationObject = new HashMap<String, Object>();
		jobApplicationObject.put("jobApplication", jobApplication);

		return new JobApplicationResponse(jobApplicationObject, "Job application updated successfully.", true);
	}
	
	@Override
	public JobApplicationResponse getAllJobApplications(HttpServletRequest request, int jobId) throws Exception {
		User currUser = this.extractUserFromRequest(request);

		Job job = jobRepository.findById(jobId);

		if(job == null){
			throw new Exception("Cannot find the job ID");
		}

		List<JobApplication> jobApplication = jobApplicationRepository.findAllByJobID(jobId);

		if(currUser.getId() != job.getUser_id()){
			throw new Exception("You do not have permission");
		}

		JobApplicationMapper mapper = new JobApplicationMapper(jobRepository, userRepository);
		List<GetApplicationListPerJobDTO> mappedJobApplications = mapper.map(jobApplication);
		
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("currentApplications", mappedJobApplications);

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
