package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedDateTimeDesc(Long userId);

    Optional<Notification> findByNotificationId(UUID id);

    long countByUserIdAndRead(Long userId, boolean read);
}
