package com.homework.backend.job.response;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class JobResponse {
	private String message;
	private HashMap<String, Object> data;

	public JobResponse(HashMap<String, Object> data, String message) {
		super();
		this.message = message;
		this.data = data;
	}

	public HashMap<String, Object> getData() {
		return data;
	}

	public void setData(HashMap<String, Object> data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
