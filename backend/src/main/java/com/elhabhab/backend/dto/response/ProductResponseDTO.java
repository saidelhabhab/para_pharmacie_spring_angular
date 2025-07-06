package com.elhabhab.backend.dto.response;


import com.elhabhab.backend.enums.ProductCategory;
import com.elhabhab.backend.enums.TaxClass;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDTO {

    private Long id;
    private UUID productId;

    private String name;
    private String description;

    private BigDecimal price;
    private BigDecimal oldPrice;
    private BigDecimal discount;

    private String imageUrl;
    private boolean inStock;
    private int quantity;

    private String brand;
    private ProductCategory category;
    private TaxClass taxClass;


    private LocalDateTime createdTime;


    private List<String> photoUrls;

}
