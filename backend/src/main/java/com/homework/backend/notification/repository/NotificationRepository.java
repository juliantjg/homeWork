package com.homework.backend.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.homework.backend.notification.model.Notification;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification, Integer> {
	@Query("SELECT notification FROM Notification notification WHERE notification.user_id = :user_id")
    List<Notification> filterByUserId(@Param("user_id") int user_id);
}
