package com.homework.backend.auth.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	private String token;

	public AuthenticationResponse(String token) {
		super();
		this.token = token;
	}
	
	
}
