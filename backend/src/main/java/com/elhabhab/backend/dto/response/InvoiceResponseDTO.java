package com.elhabhab.backend.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class InvoiceResponseDTO {
    private UUID invoiceId;
    private LocalDateTime invoiceDate;
    private BigDecimal totalAmount;
    private String invoiceStatus;
    private UUID orderId; // ou OrderResponseDTO selon besoin

    private String firstName;
    private String lastName;
    private String userEmail;
}

