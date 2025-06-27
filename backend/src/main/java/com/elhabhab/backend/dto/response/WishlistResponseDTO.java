package com.elhabhab.backend.dto.response;


import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistResponseDTO {
    private UUID wishlistId;
    private UUID productId;
    private String productName;
    private String imageUrl;
    private UUID userId;
    private LocalDateTime addedDate;
}
