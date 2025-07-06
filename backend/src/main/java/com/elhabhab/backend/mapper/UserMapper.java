package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.request.UserRequestDTO;
import com.elhabhab.backend.dto.response.UserResponseDTO;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.enums.UserRole;
import org.mapstruct.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", expression = "java(java.util.UUID.randomUUID())")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "profileImg", expression = "java(convertBase64ToBytes(requestDTO.getProfileImgBase64()))")
    @Mapping(target = "accountNotExpired", constant = "true")
    @Mapping(target = "isEnable", constant = "true")
    @Mapping(target = "accountNonLocked", constant = "true")
    @Mapping(target = "credentialsNonExpired", constant = "true")
    @Mapping(target = "createdTime", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "codeVerification", ignore = true)
    @Mapping(target = "providedId", ignore = true)
    User toEntity(UserRequestDTO requestDTO);

    @Mapping(target = "profileImgUrl", expression = "java(generateProfileImageUrl(user.getUserId()))")
    @Mapping(target = "accountStatus", expression = "java(mapAccountStatus(user))")
    UserResponseDTO toResponseDTO(User user);

    default UserRole mapRole(String role) {
        if (role == null) {
            return UserRole.USER;
        }
        return UserRole.valueOf(role.toUpperCase());
    }

    default byte[] convertBase64ToBytes(String base64) {
        if (base64 == null || base64.isEmpty()) {
            return null;
        }
        String base64Data = base64.split(",")[1];
        return Base64.getDecoder().decode(base64Data);
    }

    default String generateProfileImageUrl(UUID userId) {
        return userId != null ? "/api/users/" + userId + "/profile-image" : null;
    }

    default Map<String, Boolean> mapAccountStatus(User user) {
        Map<String, Boolean> status = new HashMap<>();
        status.put("accountNotExpired", user.isAccountNotExpired());
        status.put("enabled", user.isEnable());
        status.put("accountNonLocked", user.isAccountNonLocked());
        status.put("credentialsNonExpired", user.isCredentialsNonExpired());
        return status;
    }
}