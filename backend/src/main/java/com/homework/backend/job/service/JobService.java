package com.homework.backend.job.service;

import com.homework.backend.job.request.JobRequest;
import com.homework.backend.job.response.GetAllJobsResponse;
import com.homework.backend.job.response.JobResponse;

import jakarta.servlet.http.HttpServletRequest;

public interface JobService {
	/**
	 * Get all jobs
	 * @param request
	 * @param type (all/my-posted)
	 * @return
	 */
	public GetAllJobsResponse getAllJobs(HttpServletRequest request, String type) throws Exception;
	
	/**
	 * Create a job based on parameters given in jobRequest
	 * @param request
	 * @param jobRequest
	 * @return
	 */
	public JobResponse createJob(HttpServletRequest request, JobRequest jobRequest) throws Exception;
	
	/**
	 * Get details of a job listed in Job model
	 * @param request
	 * @param id
	 * @return
	 */
	public JobResponse readJob(HttpServletRequest request, int id) throws Exception;
	
	/**
	 * Update details of a job listen in Job model. Only accessible to job creator
	 * @param request
	 * @param id
	 * @param jobRequest
	 * @return
	 */
	public JobResponse updateJob(HttpServletRequest request, int id, JobRequest jobRequest) throws Exception;
	
	/**
	 * Delete a job given ID. Can only be deleted by job creator
	 * @param request
	 * @param id
	 * @return
	 */
	public JobResponse deleteJob(HttpServletRequest request, int id) throws Exception;
}
