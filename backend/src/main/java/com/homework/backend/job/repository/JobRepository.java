package com.homework.backend.job.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.homework.backend.job.model.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
	//	The JpaRepository type here is the model itself, and the model's primary key type
	
	Optional<Job> findByTitle(String title);

	Job findById(int id);
	
	@Query("SELECT job FROM Job job WHERE job.user_id = :user_id")
	List<Job> findAllByUserId(@Param("user_id") int user_id);

//	@Query("SELECT job FROM Job job WHERE jobapplication.applicant_id = :applicant_id AND jobapplication.job_id = :job_id")
//	JobApplication findByApplicantIdAndJobId(@Param("applicant_id") int applicant_id, @Param("job_id") int job_id);
}
