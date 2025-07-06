package com.elhabhab.backend.dto.request.auth;

import lombok.Data;

@Data
public class ChangePasswordDto {

    String currentPassword;
    String newPassword;
}
