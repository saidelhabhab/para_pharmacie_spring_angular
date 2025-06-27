package com.elhabhab.backend.service.user.notification;


import com.elhabhab.backend.dto.request.NotificationRequestDTO;
import com.elhabhab.backend.dto.response.NotificationResponseDTO;
import com.elhabhab.backend.entity.Notification;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.mapper.NotificationMapper;
import com.elhabhab.backend.repository.NotificationRepository;
import com.elhabhab.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserNotificationServiceImpl implements UserNotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Override
    public List<NotificationResponseDTO> getNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedDateTimeDesc(userId)
                .stream()
                .map(notificationMapper::toDto)
                .toList();
    }

    @Override
    public void createNotification(NotificationRequestDTO requestDTO) {
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Notification notification = notificationMapper.toEntity(requestDTO);
        notification.setUser(user);
        notificationRepository.save(notification);
    }

    @Override
    public void createNotificationPaying(Long userId, String message) {
        Notification notification = new Notification();
        notification.setNotificationId(UUID.randomUUID());
        notification.setDescription(message);
        notification.setRead(false);
        notification.setCreatedDateTime(LocalDateTime.now());
        notification.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found")));
        notificationRepository.save(notification);
    }

    @Override
    public long countUserNotifications(Long userId, boolean read) {
        return notificationRepository.countByUserIdAndRead(userId, read);
    }

    @Override
    public void markAsRead(UUID notificationId) {
        Notification notification = notificationRepository.findByNotificationId(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public NotificationResponseDTO getNotificationBySecondId(UUID id) {
        Notification notification = notificationRepository.findByNotificationId(id)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));
        return notificationMapper.toDto(notification);
    }

    @Override
    public boolean deleteNotification(Long id) {
        if (notificationRepository.existsById(id)) {
            notificationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
