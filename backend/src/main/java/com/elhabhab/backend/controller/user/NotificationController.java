package com.elhabhab.backend.controller.user;

import com.elhabhab.backend.dto.request.NotificationRequestDTO;
import com.elhabhab.backend.dto.response.NotificationResponseDTO;
import com.elhabhab.backend.service.user.notification.UserNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final UserNotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<NotificationResponseDTO> getNotifications(@PathVariable Long userId) {
        return notificationService.getNotifications(userId);
    }

    @PostMapping
    public void createNotification(@RequestBody NotificationRequestDTO dto) {
        notificationService.createNotification(dto);
    }

    @PostMapping("/paying")
    public void createPayingNotification(@RequestParam Long userId, @RequestParam String message) {
        notificationService.createNotificationPaying(userId, message);
    }

    @GetMapping("/count")
    public long countUserNotifications(@RequestParam Long userId, @RequestParam boolean read) {
        return notificationService.countUserNotifications(userId, read);
    }

    @PatchMapping("/mark-as-read/{notificationId}")
    public void markAsRead(@PathVariable UUID notificationId) {
        notificationService.markAsRead(notificationId);
    }

    @GetMapping("/{notificationId}")
    public NotificationResponseDTO getNotification(@PathVariable UUID notificationId) {
        return notificationService.getNotificationBySecondId(notificationId);
    }

    @DeleteMapping("/{id}")
    public boolean deleteNotification(@PathVariable Long id) {
        return notificationService.deleteNotification(id);
    }
}
