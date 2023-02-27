package com.homework.backend.job.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobRequest {
	private String title;
	@NotBlank
	private String description;
	@NotNull
	@Min(1)
	private float salary;
	private String location;
	private String postcode;
	
	public JobRequest(String title, String description, float salary, String location, String postcode) {
		this.title = title;
		this.description = description;
		this.salary = salary;
		this.location = location;
		this.postcode = postcode;
	}
	
	public JobRequest() {
		super();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getSalary() {
		return salary;
	}

	public void setSalary(float salary) {
		this.salary = salary;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	
	
}
