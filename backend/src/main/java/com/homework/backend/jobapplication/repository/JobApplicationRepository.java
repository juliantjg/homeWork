package com.homework.backend.jobapplication.repository;

import com.homework.backend.job.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.homework.backend.jobapplication.model.JobApplication;

import java.util.List;

@Repository
public interface JobApplicationRepository  extends JpaRepository<JobApplication, Integer> {

    JobApplication findById(int applicant_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.job_id = :job_id")
    List<JobApplication> findAllByJobID(@Param("job_id") int job_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.job_id = :job_id")
    List<JobApplication> filterByApplicantIdAndJobId(@Param("applicant_id") int applicant_id, @Param("job_id") int job_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.job_id = :job_id")
    JobApplication findByApplicantIdAndJobId(@Param("applicant_id") int applicant_id, @Param("job_id") int job_id);
}
