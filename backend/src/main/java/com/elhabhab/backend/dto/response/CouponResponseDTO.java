package com.elhabhab.backend.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponResponseDTO {

    private Long id;
    private UUID couponId;
    private String code;
    private BigDecimal discountAmount;
    private Boolean percentage;
    private LocalDateTime validFrom;
    private LocalDateTime validUntil;
    private int usageLimit;
    private int usedCount;
    private boolean active;
}
