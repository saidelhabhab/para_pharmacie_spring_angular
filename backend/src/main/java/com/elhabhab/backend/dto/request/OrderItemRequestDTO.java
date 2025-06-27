package com.elhabhab.backend.dto.request;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemRequestDTO {
    private UUID productId;
    private int quantity;
}