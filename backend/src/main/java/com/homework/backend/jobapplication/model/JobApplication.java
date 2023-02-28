package com.homework.backend.jobapplication.model;

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
	
	public JobApplication() {
		
	}
	
	public JobApplication(int id, int applicant_id, int job_id) {
		super();
		this.id = id;
		this.applicant_id = applicant_id;
		this.job_id = job_id;
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
}
