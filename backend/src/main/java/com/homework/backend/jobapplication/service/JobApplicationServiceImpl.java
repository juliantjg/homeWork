package com.homework.backend.jobapplication.service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.enums.JobApplicationStatus;
import com.homework.backend.enums.Role;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.jobapplication.dto.GetApplicationListPerJobDTO;
import com.homework.backend.jobapplication.mapper.JobApplicationMapper;
import com.homework.backend.jobapplication.model.JobApplication;
import com.homework.backend.jobapplication.repository.JobApplicationRepository;
import com.homework.backend.jobapplication.request.JobApplicationRequest;
import com.homework.backend.jobapplication.request.UpdateJobApplicationRequest;
import com.homework.backend.jobapplication.response.JobApplicationResponse;
import com.homework.backend.notification.model.Notification;
import com.homework.backend.notification.repository.NotificationRepository;
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
	@Autowired
	private NotificationRepository notificationRepository;
	
	public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository, JwtService jwtService,
			Validator validator, JobRepository jobRepository, UserRepository userRepository, 
			NotificationRepository notificationRepository) {
		super();
		this.jobApplicationRepository = jobApplicationRepository;
		this.jwtService = jwtService;
		this.validator = validator;
		this.jobRepository = jobRepository;
		this.userRepository = userRepository;
		this.notificationRepository = notificationRepository;
	}
	
	
	@Override
	public JobApplicationResponse createJobApplication(
			HttpServletRequest request, 
			JobApplicationRequest jobApplicationRequest
	) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		this.checkRole(currUser, Role.JOB_SEEKER);
		
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
		
		Job job = jobRepository.findById(jobApplicationRequest.getJob_id());

		var jobApplication = new JobApplication(
				jobApplicationRequest.getApplicant_id(),
				jobApplicationRequest.getJob_id(),
				job.getUser_id(),
				JobApplicationStatus.PENDING
		);

		jobApplicationRepository.save(jobApplication);
		
		String notificationDescription = "A new job application request has been made to your job titled [" + job.getTitle() + "]. Click for more details.";
		var notification = new Notification(
					notificationDescription,
					job.getUser_id()
				);
		notificationRepository.save(notification);
		
		HashMap<String, Object> jobApplicationObject = new HashMap<>();
		jobApplicationObject.put("jobApplicationObject", jobApplication);

		return new JobApplicationResponse(jobApplicationObject, "Job Applied", true);
	}
	
	@Override
	public JobApplicationResponse updateJobApplicationStatus(HttpServletRequest request,
			int id, UpdateJobApplicationRequest updateJobApplicationRequest) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		this.checkRole(currUser, Role.EMPLOYER);
		
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
		
		String notificationDescription = "Your application on job titled [" + job.getTitle() + "] has been updated. Click for more details.";
		var notification = new Notification(
					notificationDescription,
					jobApplication.getApplicant_id()
				);
		notificationRepository.save(notification);

		HashMap<String, Object> jobApplicationObject = new HashMap<String, Object>();
		jobApplicationObject.put("jobApplication", jobApplication);

		return new JobApplicationResponse(jobApplicationObject, "Job application updated successfully.", true);
	}
	
	@Override
	public JobApplicationResponse getAllJobApplications(HttpServletRequest request, int jobId) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		this.checkRole(currUser, Role.EMPLOYER);

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

		return new JobApplicationResponse(jobObject, "Job applications fetched", true);
	}

	@Override
	public JobApplicationResponse getAssociatedJobApplications(HttpServletRequest request, String type) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		List<JobApplication> jobApplication = jobApplicationRepository.filterByApplicantId(currUser.getId());
		if (type.equals("creator-id")) {
			jobApplication = jobApplicationRepository.filterByJobCreatorId(currUser.getId());
		}
		
		JobApplicationMapper mapper = new JobApplicationMapper(jobRepository, userRepository);
		List<GetApplicationListPerJobDTO> mappedJobApplications = mapper.map(jobApplication);
		
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("currentApplications", mappedJobApplications);

		return new JobApplicationResponse(jobObject, "Associated job applications fetched", true);
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
