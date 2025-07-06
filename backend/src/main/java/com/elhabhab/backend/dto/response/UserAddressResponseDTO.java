package com.elhabhab.backend.dto.response;

import lombok.Data;

import java.util.UUID;

@Data
public class UserAddressResponseDTO {
    private Long id;
    private UUID userId;
    private String name;
    private String street;
    private String city;
    private String zip;
    private String userPhone;
}
