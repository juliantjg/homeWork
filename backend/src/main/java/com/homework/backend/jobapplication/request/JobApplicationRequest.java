package com.homework.backend.jobapplication.request;

import jakarta.validation.constraints.NotBlank;

public class JobApplicationRequest {
	@NotBlank
	private int applicant_id;
	@NotBlank
	private int job_id;
	
	public JobApplicationRequest() {
	}
	
	public JobApplicationRequest(@NotBlank int applicant_id, @NotBlank int job_id) {
		super();
		this.applicant_id = applicant_id;
		this.job_id = job_id;
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
