package com.homework.backend.user.response;

import java.util.HashMap;

public class UserResponse {
	private boolean success;
	private String message;
	private HashMap<String, Object> data;

	public UserResponse(HashMap<String, Object> data, String message, boolean success) {
		super();
		this.message = message;
		this.data = data;
		this.success = success;
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
