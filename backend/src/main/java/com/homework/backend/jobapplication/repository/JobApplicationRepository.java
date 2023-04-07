package com.homework.backend.jobapplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.homework.backend.jobapplication.model.JobApplication;

@Repository
public interface JobApplicationRepository  extends JpaRepository<JobApplication, Integer> {

    JobApplication findById(int applicant_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.job_id = :job_id")
    List<JobApplication> findAllByJobID(@Param("job_id") int job_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.job_id = :job_id")
    List<JobApplication> filterByApplicantIdAndJobId(@Param("applicant_id") int applicant_id, @Param("job_id") int job_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.job_id = :job_id")
    JobApplication findByApplicantIdAndJobId(@Param("applicant_id") int applicant_id, @Param("job_id") int job_id);
    
    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id")
    List<JobApplication> filterByApplicantId(@Param("applicant_id") int applicant_id);

    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.job_creator_id = :job_creator_id")
    List<JobApplication> filterByJobCreatorId(@Param("job_creator_id") int job_creator_id);
    
    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.status = 1")
    List<JobApplication> filterAcceptedByApplicantId(@Param("applicant_id") int applicant_id);
    
    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.status = 0")
    List<JobApplication> filterPendingByApplicantId(@Param("applicant_id") int applicant_id);
    
    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.job_creator_id = :job_creator_id AND jobapplication.status = 1")
    List<JobApplication> filterAcceptedByJobCreatorId(@Param("job_creator_id") int job_creator_id);
    
    @Query("SELECT jobapplication FROM JobApplication jobapplication WHERE jobapplication.job_creator_id = :job_creator_id AND jobapplication.status = 0")
    List<JobApplication> filterPendingByJobCreatorId(@Param("job_creator_id") int job_creator_id);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM JobApplication jobapplication WHERE jobapplication.job_id = :job_id")
    void deleteByJobId(@Param("job_id") int job_id);
}
