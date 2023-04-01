package com.homework.backend.user.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homework.backend.user.dto.UserDTO;
import com.homework.backend.user.mapper.UserMapper;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;
import com.homework.backend.user.response.UserResponse;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserResponse read(HttpServletRequest request, int userId) throws Exception {
		User user = userRepository.findById(userId);
		if(user == null){
			throw new Exception("Cannot find the user ID");
		}
		UserMapper mapper = new UserMapper();
		UserDTO userDTO = mapper.userToUserDTO(user);
		
		HashMap<String, Object> jobObject = new HashMap<String, Object>();
		jobObject.put("user", userDTO);
		return new UserResponse(jobObject, "User found", true);
	}
}
