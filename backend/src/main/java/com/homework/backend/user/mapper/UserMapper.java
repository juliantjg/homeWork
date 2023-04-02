package com.homework.backend.user.mapper;

import com.homework.backend.user.dto.UserDTO;
import com.homework.backend.user.model.User;

public class UserMapper {
	
	public UserMapper() {
	}
	
	public UserDTO userToUserDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO(
        			user.getId(),
        			user.getFirstname(),
        			user.getLastname(),
        			user.getUsername(),
        			user.getRole()
        		);
        
        return userDTO;
    }
}
