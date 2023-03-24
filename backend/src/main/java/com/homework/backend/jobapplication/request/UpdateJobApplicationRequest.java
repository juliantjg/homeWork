package com.homework.backend.jobapplication.request;

import com.homework.backend.enums.JobApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
//import org.apache.commons.lang3.EnumUtils;

public class UpdateJobApplicationRequest {

	@NotNull
	private JobApplicationStatus status;


	public UpdateJobApplicationRequest() {
	}

	public UpdateJobApplicationRequest(@NotBlank JobApplicationStatus status) throws Exception{
		super();

		this.status = status;
	}

	public JobApplicationStatus getStatus() {return status; }

	public void setStatus(JobApplicationStatus status) {this.status = status; }
}
