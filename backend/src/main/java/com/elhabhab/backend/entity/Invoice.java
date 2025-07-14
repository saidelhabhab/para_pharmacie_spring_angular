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
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false, columnDefinition = "BINARY(16)")
    private UUID invoiceId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", referencedColumnName = "orderId", nullable = false, unique = true, columnDefinition = "BINARY(16)")
    private Order order;

    @Column(nullable = false)
    private LocalDateTime invoiceDate;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(precision = 10, scale = 2)
    private BigDecimal discountAmount;

    private String paymentMethod;

    private String deliveryOption;

    private String invoiceStatus; // Par exemple: PAID, PENDING, CANCELLED, etc.

    // Tu peux aussi ajouter des informations supplémentaires ici, comme adresse facturation, TVA, etc.
}
