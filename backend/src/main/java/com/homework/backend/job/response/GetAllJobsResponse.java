package com.homework.backend.job.response;

import com.homework.backend.job.model.Job;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
public class GetAllJobsResponse {
	private boolean success;
    private String message;
    private List<Job> data;

    public GetAllJobsResponse(List<Job> data, String message, boolean success) {
        super();
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public List<Job> getData() {
        return data;
    }

    public void setData(List<Job> data) {
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
