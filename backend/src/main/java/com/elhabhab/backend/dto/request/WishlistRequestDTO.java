package com.elhabhab.backend.dto.request;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistRequestDTO {
    private UUID productId;
    private UUID userId;
}
