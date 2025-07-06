package com.elhabhab.backend.dto.response;


import com.elhabhab.backend.enums.OrderStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseDTO {
    private UUID orderId;
    private UUID userId;
    private Long addressId;
    private List<OrderItemResponseDTO> items;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
    private OrderStatus status;

    private String couponCode;
    private BigDecimal discountAmount;
}