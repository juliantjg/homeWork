package com.homework.backend.user.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.config.service.JwtService;
import com.homework.backend.enums.Role;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.jobapplication.repository.JobApplicationRepository;
import com.homework.backend.user.dto.UserDTO;
import com.homework.backend.user.mapper.UserMapper;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;
import com.homework.backend.user.response.UserResponse;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {
	
	private JwtService jwtService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JobRepository jobRepository;
	@Autowired
	private JobApplicationRepository jobApplicationRepository;
	
	public UserServiceImpl(JwtService jwtService) {
		this.jwtService = jwtService;
	}

	@Override
	public UserResponse read(HttpServletRequest request, int userId) throws Exception {
		User user = userRepository.findById(userId);
		if(user == null){
			throw new Exception("Cannot find the user ID");
		}
		UserMapper mapper = new UserMapper();
		UserDTO userDTO = mapper.userToUserDTO(user);
		
		HashMap<String, Object> userObject = new HashMap<String, Object>();
		userObject.put("user", userDTO);
		return new UserResponse(userObject, "User found", true);
	}

	@Override
	public UserResponse homeData(HttpServletRequest request) throws Exception {
		User currUser = this.extractUserFromRequest(request);
		
		if (currUser.getRole() == Role.EMPLOYER) {
			int numJobsPostedByCurrUser = jobRepository.findAllByUserId(currUser.getId()).size();
			int numSuccessfulApplications = jobApplicationRepository.filterAcceptedByJobCreatorId(currUser.getId()).size();
			int numPendingApplications = jobApplicationRepository.filterPendingByJobCreatorId(currUser.getId()).size();
			
			HashMap<String, Object> userObject = new HashMap<String, Object>();
			userObject.put("numJobsPostedByCurrUser", numJobsPostedByCurrUser);
			userObject.put("numSuccessfulApplications", numSuccessfulApplications);
			userObject.put("numPendingApplications", numPendingApplications);
			return new UserResponse(userObject, "User found", true);
		}
		else {
			int numSuccessfulApplications = jobApplicationRepository.filterAcceptedByApplicantId(currUser.getId()).size();
			int numPendingApplications = jobApplicationRepository.filterPendingByApplicantId(currUser.getId()).size();
			
			HashMap<String, Object> userObject = new HashMap<String, Object>();
			userObject.put("numSuccessfulApplications", numSuccessfulApplications);
			userObject.put("numPendingApplications", numPendingApplications);
			return new UserResponse(userObject, "User found", true);
		}
	}
	
	/**
	 * Helper function to get user from request
	 * @param request
	 * @return
	 */
	private User extractUserFromRequest(HttpServletRequest request) {
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		jwt = authHeader.substring(7);
		return jwtService.extractUser(jwt);
	}
}
