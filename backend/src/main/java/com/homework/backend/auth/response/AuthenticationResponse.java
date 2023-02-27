package com.homework.backend.auth.response;

import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AuthenticationResponse {
	private boolean success;
	private String message;
	private HashMap<String, Object> data;

	public AuthenticationResponse(HashMap<String, Object> data, String message, boolean success) {
		super();
		this.success = success;
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

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
