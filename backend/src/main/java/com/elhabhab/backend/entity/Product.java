package com.elhabhab.backend.entity;

import com.elhabhab.backend.enums.ProductCategory;
import com.elhabhab.backend.enums.TaxClass;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, updatable = false)
    private UUID productId;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;


    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price; // Prix actuel (ex: 100 DH)

    @Column(precision = 10, scale = 2)
    private BigDecimal oldPrice; // Ancien prix (ex: 120 DH)

    @Column(precision = 10, scale = 2)
    private BigDecimal discount; // Montant de la remise (ex: 20 DH)

    private String imagePath;

    private boolean inStock;

    private int quantity;

    private String brand;

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    @Enumerated(EnumType.STRING)
    private TaxClass taxClass; // ENUM: NONE, TVA_7, TVA_10, TVA_20 etc.

    private LocalDateTime createdTime;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductPhoto> photos = new ArrayList<>();

}

