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
    private List<OrderItemRequestDTO> items;
    private String couponCode; // optional

}
