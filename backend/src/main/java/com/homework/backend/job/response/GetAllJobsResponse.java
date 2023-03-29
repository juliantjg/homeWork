package com.homework.backend.job.response;

import java.util.List;

import com.homework.backend.job.dto.JobDetailsDTO;

import lombok.Data;

@Data
public class GetAllJobsResponse {
	private boolean success;
    private String message;
    private List<JobDetailsDTO> data;

    public GetAllJobsResponse(List<JobDetailsDTO> data, String message, boolean success) {
        super();
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public List<JobDetailsDTO> getData() {
        return data;
    }

    public void setData(List<JobDetailsDTO> data) {
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
