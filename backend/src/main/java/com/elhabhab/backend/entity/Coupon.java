package com.elhabhab.backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private UUID couponId;

    @Column(nullable = false, unique = true)
    private String code; // Code promo unique

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal discountAmount; // Montant ou pourcentage de réduction

    @Column(nullable = false)
    private boolean percentage; // true si c’est un % sinon montant fixe

    @Column(nullable = false)
    private LocalDateTime validFrom;

    @Column(nullable = false)
    private LocalDateTime validUntil;

    private int usageLimit; // Nombre max d’utilisations

    private int usedCount; // Nombre d’utilisations actuelles

    private boolean active; // Coupon actif ou non
}
