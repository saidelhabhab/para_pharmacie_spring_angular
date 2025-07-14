package com.elhabhab.backend.entity;

import com.elhabhab.backend.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false, columnDefinition = "BINARY(16)")
    private UUID userId;

    @Column(unique = true)
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name length should not exceed 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name length should not exceed 50 characters")
    private String lastName;

    @NotBlank(message = "Password is required")
    private String password;

    private UserRole role;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+[1-9]\\d{1,14}$", message = "Invalid phone number")
    private String phone;


    private String address;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] profileImg;

    @Lob
    private String aboutMe;

    private String country;

    private boolean accountNotExpired;
    private boolean isEnable;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private String providedId;
    private String codeVerification;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdTime;

}