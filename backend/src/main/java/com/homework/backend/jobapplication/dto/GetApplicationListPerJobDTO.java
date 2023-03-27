package com.homework.backend.jobapplication.dto;

import org.springframework.beans.factory.annotation.Autowired;

import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;

public class GetApplicationListPerJobDTO {
	private int id;
	private int applicant_id;
	private int job_id;
	private String applicant_email;
	private String job_title;
	
	public GetApplicationListPerJobDTO() {
		super();
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
	
	public String getApplicant_email() {
		return applicant_email;
	}
	
	public void setApplicant_email(String applicant_email) {
		this.applicant_email = applicant_email;
	}
	
	public String getJob_title() {
		return this.job_title;
	}
	
	public void setJob_title(String job_title) {
		this.job_title = job_title;
	}
	
	
}
