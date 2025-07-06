package com.elhabhab.backend.dto.request;


import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CouponRequestDTO {

    @NotBlank
    private String code;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal discountAmount;

    @NotNull
    private Boolean percentage;

    @NotNull
    private LocalDateTime validFrom;

    @NotNull
    private LocalDateTime validUntil;

    @Min(0)
    private int usageLimit;

    private boolean active;
}
