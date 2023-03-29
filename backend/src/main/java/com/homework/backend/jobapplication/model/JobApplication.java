package com.homework.backend.jobapplication.model;

import com.homework.backend.enums.JobApplicationStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class JobApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int applicant_id;
	private int job_id;
	private int job_creator_id;

	private JobApplicationStatus status;
	
	public JobApplication() {
		
	}
	
	public JobApplication(int applicant_id, int job_id, int job_creator_id, JobApplicationStatus status) {
		super();
		this.applicant_id = applicant_id;
		this.job_id = job_id;
		this.job_creator_id = job_creator_id;
		this.status = status;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getApplicant_id() {
		return applicant_id;
	}
	
	public void setApplicant_id(int applicant_id) {
		this.applicant_id = applicant_id;
	}
	
	public int getJob_id() {
		return job_id;
	}
	
	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}
	
	public int getJob_creator_id() {
		return job_creator_id;
	}

	public void setJob_creator_id(int job_creator_id) {
		this.job_creator_id = job_creator_id;
	}

	public JobApplicationStatus getStatus() {return status; }

	public void setStatus(JobApplicationStatus status) {this.status = status; }
}
