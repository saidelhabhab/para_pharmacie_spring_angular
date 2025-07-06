package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.request.NotificationRequestDTO;
import com.elhabhab.backend.dto.response.NotificationResponseDTO;
import com.elhabhab.backend.entity.Notification;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificationMapper {

    @Mapping(target = "notificationId", expression = "java(java.util.UUID.randomUUID())")
    @Mapping(target = "read", constant = "false")
    @Mapping(target = "user.id", source = "userId") // We'll resolve full user in service
    Notification toEntity(NotificationRequestDTO dto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.lastName", target = "userFullName") // Optional: if needed
    NotificationResponseDTO toDto(Notification notification);
}
