package com.homework.backend.job.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.homework.backend.job.dto.JobDetailsDTO;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.jobapplication.model.JobApplication;
import com.homework.backend.jobapplication.repository.JobApplicationRepository;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;

public class JobMapper {
	
	@Autowired
	private JobApplicationRepository jobApplicationRepository;
	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private UserRepository userRepository;
	
	public JobMapper(JobApplicationRepository jobApplicationRepository, 
			JobRepository jobRepository, UserRepository userRepository) {
		this.jobApplicationRepository = jobApplicationRepository;
		this.jobRepository = jobRepository;
		this.userRepository = userRepository;
	}
	

	public JobDetailsDTO mapJobDetails(Job job, int authUserId) {
        if (job == null) {
            return null;
        }
        
        JobDetailsDTO jobDetailsDTO = new JobDetailsDTO();
        
        jobDetailsDTO.setId(job.getId());
        jobDetailsDTO.setTitle(job.getTitle());
        jobDetailsDTO.setDescription(job.getDescription());
        jobDetailsDTO.setSalary(job.getSalary());
        jobDetailsDTO.setLocation(job.getLocation());
        jobDetailsDTO.setPostcode(job.getPostcode());
        jobDetailsDTO.setUser_id(job.getUser_id());
        
        User jobCreator = userRepository.findById(job.getUser_id());
        
        jobDetailsDTO.setCreator_firstname(jobCreator.getFirstname());
        
        JobApplication jobApplication = jobApplicationRepository.findByApplicantIdAndJobId(authUserId, job.getId());

        if (jobApplication == null) {
        	jobDetailsDTO.setApplication_status(null);
        }
        else {
        	jobDetailsDTO.setApplication_status(jobApplication.getStatus());
        }
        
        return jobDetailsDTO;
    }
	
	public List<JobDetailsDTO> mapShowAllJobs(List<Job> jobs, int authUserId) {
        if (jobs == null) {
            return null;
        }

        List<JobDetailsDTO> list = new ArrayList<JobDetailsDTO>(jobs.size());
        for (Job job : jobs) {
            list.add(mapJobDetails(job, authUserId));
        }

        return list;
    }
}
