package com.homework.backend.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.homework.backend.enums.JobType;
import com.homework.backend.enums.Role;
import com.homework.backend.job.model.Job;
import com.homework.backend.job.repository.JobRepository;
import com.homework.backend.user.model.User;
import com.homework.backend.user.repository.UserRepository;

@Component
public class UserApplicationsTableSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User(
				"Employer",
				"Guy",
				"employer@email.com",
				"$2a$12$uPXPdgUv6mfNxaS7hQNfxOtHX8B5/E0zLPsFbRRyuLal.O1EGzbpu",
				Role.EMPLOYER
				);
        userRepository.save(user1);

        User user2 =  new User(
				"Seeker",
				"Guy",
				"seeker@email.com",
				"$2a$12$uPXPdgUv6mfNxaS7hQNfxOtHX8B5/E0zLPsFbRRyuLal.O1EGzbpu",
				Role.JOB_SEEKER
				);
        userRepository.save(user2);
        
        Job job1 =  new Job(
				"Lawn Mower Needed!",
				"Required lawn mower! Please contact my email address on my profile. Thank you!",
				21,
				"Brunswick, VIC",
				"3056",
				user1.getId(),
				JobType.LAWN_MOWING
				);
        jobRepository.save(job1);
        
        Job job2 =  new Job(
				"Baby Sitter Needed!",
				"Required baby sitter! Please contact my email address on my profile. Thank you!",
				21,
				"Melbourne, VIC",
				"3000",
				user1.getId(),
				JobType.BABY_SITTING
				);
        jobRepository.save(job2);
        
        Job job3 =  new Job(
				"Tutor Needed!",
				"Required tutor! Please contact my email address on my profile. Thank you!",
				21,
				"Box Hill, VIC",
				"3128",
				user1.getId(),
				JobType.TUTORING
				);
        jobRepository.save(job3);
        
        Job job4 =  new Job(
				"Pet Sitter Needed!",
				"Required pet sitter! Please contact my email address on my profile. Thank you!",
				21,
				"Box Hill, VIC",
				"3128",
				user1.getId(),
				JobType.PET_SITTING
				);
        jobRepository.save(job4);
        
        Job job5 =  new Job(
				"Cleaner Needed!",
				"Required cleaner! Please contact my email address on my profile. Thank you!",
				21,
				"Melbourne, VIC",
				"3000",
				user1.getId(),
				JobType.CLEANING
				);
        jobRepository.save(job5);
        
        Job job6 =  new Job(
				"Driver Needed!",
				"This is an other job type placeholder!",
				21,
				"Brunswick, VIC",
				"3056",
				user1.getId(),
				JobType.OTHERS
				);
        jobRepository.save(job6);
    }
}
