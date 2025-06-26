package com.elhabhab.backend.service.user.notification;



import com.elhabhab.backend.dto.request.NotificationDto;

import java.util.List;
import java.util.UUID;

public interface UserNotificationService {

    public List<NotificationDto> getNotifications(Long userId);

    public void createNotification(String message);

    public void createNotificationPaying(Long userId,String message);

    public long countUserNotifications(Long userId, boolean read);

    public void markAsRead(UUID notificationId);

    public NotificationDto getNotificationBySecondId(UUID id);
    public boolean deleteNotification(Long id);
}
