package com.homework.backend.job.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homework.backend.job.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
	//	The JpaRepository type here is the model itself, and the model's primary key type
	
	Optional<Job> findByTitle(String title);
}
