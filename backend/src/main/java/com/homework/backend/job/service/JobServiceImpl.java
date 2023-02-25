package com.homework.backend.job.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.homework.backend.auth.response.AuthenticationResponse;
import com.homework.backend.job.response.GetAllJobsResponse;
import com.homework.backend.job.response.JobResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.job.request.JobRequest;
import com.homework.backend.user.model.User;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class JobServiceImpl implements JobService {
	
	@Autowired
	private JobRepository jobRepository;
	private JwtService jwtService;

	private Job jobs;

	public JobServiceImpl(JobRepository jobRepository, JwtService jwtService) {
		this.jobRepository = jobRepository;
		this.jwtService = jwtService;
	}

	@Override
	public GetAllJobsResponse getAllJobs(HttpServletRequest request) {
		User currUser = this.extractUserFromRequest(request);
		// TODO Auto-generated method stub
		List<Job> jobs = jobRepository.findAll();
		return new GetAllJobsResponse(jobs, "Register successful");
	}

	@Override
	public String createJob(HttpServletRequest request, JobRequest jobRequest) {
		User currUser = this.extractUserFromRequest(request);

		return null;
	}

	@Override
	public String readJob(HttpServletRequest request, int id) { //Get job byID??
		User currUser = this.extractUserFromRequest(request);
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String updateJob(HttpServletRequest request, int id, JobRequest jobRequest) {
		User currUser = this.extractUserFromRequest(request);

		jobRepository.save(jobs);
		return null;
	}

	@Override
	public String deleteJob(HttpServletRequest request, int id) {
		User currUser = this.extractUserFromRequest(request);
		jobRepository.deleteById(id);
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
