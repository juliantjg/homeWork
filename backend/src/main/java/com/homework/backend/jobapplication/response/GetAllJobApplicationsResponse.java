package com.homework.backend.jobapplication.response;

import com.homework.backend.job.model.Job;
import com.homework.backend.jobapplication.model.JobApplication;
import lombok.Data;

import java.util.List;

@Data
public class GetAllJobApplicationsResponse {
	private boolean success;
    private String message;
    private List<JobApplication> data;

    public GetAllJobApplicationsResponse(List<JobApplication> data, String message, boolean success) {
        super();
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public List<JobApplication> getData() {
        return data;
    }

    public void setData(List<JobApplication> data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
