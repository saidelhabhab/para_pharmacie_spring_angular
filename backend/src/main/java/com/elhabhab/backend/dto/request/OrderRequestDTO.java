package com.elhabhab.backend.dto.request;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDTO {
    private UUID userId;
    private Long addressId;
    private List<OrderItemRequestDTO> items;
    private String couponCode; // optional
    private String deliveryOption; // "standard" or "express"
    private String paymentMethod; // "card" or "cod"


}
