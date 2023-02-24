package com.homework.backend.job.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.job.request.JobRequest;

@Service
public class JobServiceImpl implements JobService {
	
	@Autowired
	private JobRepository jobRepository;
	private JwtService jwtService;
	
	public JobServiceImpl(JobRepository jobRepository, JwtService jwtService) {
		this.jobRepository = jobRepository;
		this.jwtService = jwtService;
	}

	@Override
	public List<Job> getAllJobs() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String createJob(JobRequest jobRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String readJob(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String updateJob(int id, JobRequest jobRequest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteJob(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}
