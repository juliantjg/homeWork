package com.homework.backend.job.service;

import java.util.List;

import com.homework.backend.job.model.Job;
import com.homework.backend.job.request.JobRequest;

public interface JobService {
	public List<Job> getAllJobs();
	
	public String createJob(JobRequest jobRequest);
	
	public String readJob(int id);
	
	public String updateJob(int id, JobRequest jobRequest);
	
	public String deleteJob(int id);
}
