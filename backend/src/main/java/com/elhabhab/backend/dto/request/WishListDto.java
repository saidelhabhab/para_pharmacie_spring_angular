package com.elhabhab.backend.dto.request;

import lombok.Data;

@Data
public class WishListDto {

    private Long id;

    private Long courseId;

    private Long userId;

    private String courseTitle;

    private String courseDescription;

    private byte[] returnedImg;

    private double price;
}
