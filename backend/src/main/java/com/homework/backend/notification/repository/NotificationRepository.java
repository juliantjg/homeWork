package com.homework.backend.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.homework.backend.notification.model.Notification;

@Repository
public interface NotificationRepository  extends JpaRepository<Notification, Integer> {

}
