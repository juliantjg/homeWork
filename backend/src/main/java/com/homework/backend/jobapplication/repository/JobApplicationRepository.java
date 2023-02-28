package com.homework.backend.jobapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homework.backend.jobapplication.model.JobApplication;

@Repository
public interface JobApplicationRepository  extends JpaRepository<JobApplication, Integer> {

}
