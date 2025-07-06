package com.elhabhab.backend.dto.response;


import com.elhabhab.backend.enums.UserRole;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String phone;
    private String address;
    private String profileImgUrl;
    private String aboutMe;
    private String country;
    private boolean enabled;
    private LocalDateTime createdTime;
    private Map<String, Boolean> accountStatus;
}
