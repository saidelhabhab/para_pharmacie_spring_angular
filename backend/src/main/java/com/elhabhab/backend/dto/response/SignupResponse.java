package com.elhabhab.backend.dto.response;

import lombok.Data;

@Data
public class SignupResponse {

    private String message;
    private UserResponseDTO user;


    // Constructor to initialize fields
    public SignupResponse(String message, UserResponseDTO user) {
        this.message = message;
        this.user = user;
    }
}
