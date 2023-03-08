package com.homework.backend.jobapplication.request;

import com.homework.backend.enums.JobApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class JobApplicationRequest {
//	@NotBlank
//	private int applicant_id;
//	@NotBlank
//	private int id;
	@NotNull
	private int applicant_id;
	@NotNull
	private int job_id;
//	@NotNull
//	private JobApplicationStatus status;

	
	public JobApplicationRequest() {
	}
	
	public JobApplicationRequest(@NotBlank int job_id,int applicant_id) {
		super();
		this.job_id = job_id;
		this.applicant_id = applicant_id;
//		this.status = status;
	}

	public int getJob_id() {
		return job_id;
	}
	
	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}

	public int getApplicant_id() {
		return applicant_id;
	}

	public void setApplicant_id(int applicant_id) {
		this.applicant_id = applicant_id;
	}

//	public JobApplicationStatus getStatus() {return status; }
//
//	public void setStatus(JobApplicationStatus status) {this.status = status; }
}
