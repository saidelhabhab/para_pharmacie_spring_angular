package com.elhabhab.backend.entity;


import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate = LocalDateTime.now();

    private BigDecimal subtotal;       // total produits sans taxe
    private BigDecimal taxAmount;      // montant TVA
    private BigDecimal deliveryFee;    // frais de livraison
    private BigDecimal discount;       // réduction totale (optionnel)
    private BigDecimal totalAmount;    // montant final payé

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    private LocalDateTime createdTime;
}


