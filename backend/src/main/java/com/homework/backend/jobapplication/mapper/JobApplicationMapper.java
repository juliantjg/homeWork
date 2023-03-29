package com.homework.backend.jobapplication.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.jobapplication.dto.GetApplicationListPerJobDTO;
import com.homework.backend.jobapplication.model.JobApplication;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;

public class JobApplicationMapper {
	
	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private UserRepository userRepository;
	
	public JobApplicationMapper(JobRepository jobRepository, UserRepository userRepository) {
		this.jobRepository = jobRepository;
		this.userRepository = userRepository;
	}
	
	public List<GetApplicationListPerJobDTO> map(List<JobApplication> jobApplications) {
        if (jobApplications == null) {
            return null;
        }

        List<GetApplicationListPerJobDTO> list = new ArrayList<GetApplicationListPerJobDTO>(jobApplications.size());
        for (JobApplication jobApplication : jobApplications) {
            list.add(jobApplicationToJobApplicationDTO(jobApplication));
        }

        return list;
    }
	
	protected GetApplicationListPerJobDTO jobApplicationToJobApplicationDTO(JobApplication jobApplication) {
        if (jobApplication == null) {
            return null;
        }

        GetApplicationListPerJobDTO getApplicationListPerJobDTO = new GetApplicationListPerJobDTO();

        getApplicationListPerJobDTO.setId(jobApplication.getId());
        getApplicationListPerJobDTO.setApplicant_id(jobApplication.getApplicant_id());
        getApplicationListPerJobDTO.setJob_id(jobApplication.getJob_id());
        getApplicationListPerJobDTO.setStatus(jobApplication.getStatus());
        getApplicationListPerJobDTO.setJob_creator_id(jobApplication.getJob_creator_id());
        
        Job job = jobRepository.findById(jobApplication.getJob_id());
        User user = userRepository.findById(jobApplication.getApplicant_id());
        
        getApplicationListPerJobDTO.setApplicant_email(user.getUsername());
        getApplicationListPerJobDTO.setJob_title(job.getTitle());
        
        return getApplicationListPerJobDTO;
    }
}
