package com.elhabhab.backend.dto.request;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationRequestDTO {
    private String description;
    private Long userId; // ID of the recipient user
}
