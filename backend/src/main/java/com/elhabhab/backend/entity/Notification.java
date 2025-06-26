package com.elhabhab.backend.entity;

import com.elhabhab.backend.dto.request.NotificationDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true)
    private UUID secondId;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_read", nullable = false)
    private boolean read;

    @Column(name = "created_date_time", columnDefinition = "datetime(6)")
    private Date createdDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public NotificationDto getNotificationDto(){
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(id);
        notificationDto.setSecondId(secondId);
        notificationDto.setDescription(description);
        notificationDto.setRead(read);
        notificationDto.setCreatedDateTime(createdDateTime);

       return notificationDto ;
    }



    }