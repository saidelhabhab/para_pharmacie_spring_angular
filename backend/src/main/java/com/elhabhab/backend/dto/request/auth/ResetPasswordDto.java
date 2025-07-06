package com.elhabhab.backend.dto.request.auth;

import lombok.Data;

@Data
public class ResetPasswordDto {

    private  String newPassword ;
    private  String token ;
}