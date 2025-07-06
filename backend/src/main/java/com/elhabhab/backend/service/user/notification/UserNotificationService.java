package com.elhabhab.backend.service.user.notification;


import com.elhabhab.backend.dto.request.NotificationRequestDTO;
import com.elhabhab.backend.dto.response.NotificationResponseDTO;

import java.util.List;
import java.util.UUID;

public interface UserNotificationService {

    List<NotificationResponseDTO> getNotifications(Long userId);

    void createNotification(NotificationRequestDTO requestDTO);

    void createNotificationPaying(Long userId, String message);

    long countUserNotifications(Long userId, boolean read);

    void markAsRead(UUID notificationId);

    NotificationResponseDTO getNotificationBySecondId(UUID id);

    boolean deleteNotification(Long id);
}
