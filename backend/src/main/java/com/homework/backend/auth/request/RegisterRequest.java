package com.homework.backend.auth.request;

import com.homework.backend.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
	@NotBlank
	private String firstname;
	@NotBlank
	private String lastname;
	@NotBlank
	@Email(message= "Invalid email format", regexp= "^[A-Za-z0-9+_.-]+@(.+)$")
	private String email;
	@NotBlank
	@Size(min=6, message="Password must be at least 6 characters")
	private String password;
	@NotNull
	private Role role;
	
	public RegisterRequest(String firstname, String lastname, String email, String password, Role role) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.role = role;
	}
	
	public RegisterRequest() {
		super();
	}
	
	public String getFirstname() {
		return firstname;
	}
	
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	
	public String getLastname() {
		return lastname;
	}
	
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
}
