package com.homework.backend.jobapplication.service;

import com.homework.backend.jobapplication.request.JobApplicationRequest;
import com.homework.backend.jobapplication.response.JobApplicationResponse;

import jakarta.servlet.http.HttpServletRequest;

public interface JobApplicationService {
	/**
	 * Create job application service
	 * @param request
	 * @param jobApplicationRequest
	 * @return
	 * @throws Exception
	 */
	public JobApplicationResponse createJobApplication(
			HttpServletRequest request, 
			JobApplicationRequest jobApplicationRequest
	) throws Exception;
	
	/**
	 * Updating status of a job application. Either accept the application or deny it
	 * @param request
	 * @param jobApplicationRequest
	 * @return
	 * @throws Exception
	 */
	public JobApplicationResponse updateJobApplicationStatus(
			HttpServletRequest request, 
			JobApplicationRequest jobApplicationRequest
	) throws Exception;
	
	/**
	 * Show all job applications for a job creator
	 * @param request
	 * @return
	 * @throws Exception
	 */
	public JobApplicationResponse getAllJobApplications(
			HttpServletRequest request
	) throws Exception;
}
