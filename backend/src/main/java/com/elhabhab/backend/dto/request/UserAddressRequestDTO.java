package com.elhabhab.backend.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class UserAddressRequestDTO {

    private UUID userId;
    private String name;
    private String street;
    private String city;
    private String zip;
    private String userPhone;
}
