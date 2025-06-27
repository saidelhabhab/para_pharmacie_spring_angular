package com.elhabhab.backend.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponseDTO {
    private Long id;
    private UUID notificationId;
    private String description;
    private boolean read;
    private LocalDateTime createdDateTime;
    private Long userId;
    private String userFullName; // optional - useful in admin panel
}
