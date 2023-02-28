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
}
