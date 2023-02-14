package com.homework.backend.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homework.backend.user.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	//	The JpaRepository type here is the model itself, and the model's primary key type
	
	Optional<User> findByEmail(String email);
}
