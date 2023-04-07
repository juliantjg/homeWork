package com.homework.backend.job.service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.enums.Role;
import com.homework.backend.job.dto.JobDetailsDTO;
import com.homework.backend.job.mapper.JobMapper;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.job.request.JobRequest;
import com.homework.backend.job.response.GetAllJobsResponse;
import com.homework.backend.job.response.JobResponse;
import com.homework.backend.jobapplication.repository.JobApplicationRepository;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;

@Service
public class JobServiceImpl implements JobService {
	
	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private JobApplicationRepository jobApplicationRepository;
	@Autowired
	private UserRepository userRepository;
	private JwtService jwtService;
	private Validator validator;

	public JobServiceImpl(JobRepository jobRepository, JobApplicationRepository jobApplicationRepository,
			UserRepository userRepository, JwtService jwtService, Validator validator) {
		this.jobRepository = jobRepository;
		this.jobApplicationRepository = jobApplicationRepository;
		this.userRepository = userRepository;
		this.jwtService = jwtService;
		this.validator = validator;
	}

	@Override
	public GetAllJobsResponse getAllJobs(HttpServletRequest request, String type) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		List<Job> jobs = jobRepository.findAll();
		if (type.equals("my-posted")) {
			jobs = jobRepository.findAllByUserId(currUser.getId());
		}
		
		JobMapper mapper = new JobMapper(jobApplicationRepository, jobRepository, userRepository);
		List<JobDetailsDTO> jobList = mapper.mapShowAllJobs(jobs, currUser.getId());
		
		return new GetAllJobsResponse(jobList, "All jobs retrieved", true);
	}

	@Override
	public JobResponse createJob(HttpServletRequest request, JobRequest jobRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		this.checkRole(currUser, Role.EMPLOYER);
		
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
				currUser.getId(),
				jobRequest.getJobType()
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
		
		JobMapper mapper = new JobMapper(jobApplicationRepository, jobRepository, userRepository);
		JobDetailsDTO jobDetailsDTO = mapper.mapJobDetails(job, currUser.getId());
		
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("job", jobDetailsDTO);
		return new JobResponse(jobObject, "Job found", true);
	}

	@Override
	public JobResponse updateJob(HttpServletRequest request, int id, JobRequest jobRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		this.checkRole(currUser, Role.EMPLOYER);
		
		Set<ConstraintViolation<JobRequest>> violations = validator.validate(jobRequest);
		if (!violations.isEmpty()) {
		  throw new ConstraintViolationException(violations);
		}
		
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
		job.setJobType(jobRequest.getJobType());

		jobRepository.save(job);
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("job", job);
		return new JobResponse(jobObject, "Job updated successfully.", true);
	}

	@Override
	public JobResponse deleteJob(HttpServletRequest request, int id) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		this.checkRole(currUser, Role.EMPLOYER);
		
		Job job;

		job = jobRepository.findById(id);

		if(job == null){
			throw new Exception("Cannot find the job ID");
		}
		if (currUser.getId() != job.getUser_id()){
			throw new Exception("User ID does not match");
		}
		jobRepository.deleteById(id);
		jobApplicationRepository.deleteByJobId(id);
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
	
	/**
	 * Helper function to authorize user role
	 * @param user
	 * @param role
	 * @throws Exception
	 */
	private void checkRole(User user, Role role) throws Exception {
		if (user.getRole() != role) {
			throw new Exception ("User role must be " + role + " to access this API");
		}
	}
}
