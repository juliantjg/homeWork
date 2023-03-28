package com.homework.backend.job.dto;

import com.homework.backend.enums.JobApplicationStatus;

public class JobDetailsDTO {
	private int id;
	private String title;
	private String description;
	private float salary;
	private String location;
	private String postcode;
	private int user_id;
	
	private String creator_firstname;
	private JobApplicationStatus application_status;
	
	public JobDetailsDTO() {
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCreator_firstname() {
		return creator_firstname;
	}
	public void setCreator_firstname(String creator_firstname) {
		this.creator_firstname = creator_firstname;
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
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public JobApplicationStatus getApplication_status() {
		return application_status;
	}
	public void setApplication_status(JobApplicationStatus application_status) {
		this.application_status = application_status;
	}
}
