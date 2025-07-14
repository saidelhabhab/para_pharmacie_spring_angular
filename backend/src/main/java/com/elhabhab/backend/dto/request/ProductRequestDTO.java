package com.elhabhab.backend.dto.request;


import com.elhabhab.backend.enums.ProductCategory;
import com.elhabhab.backend.enums.TaxClass;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequestDTO {

    @NotNull
    private String name;
    private String description;

    @NotNull(message = "Barcode is required")
    private String barcode;

    @NotNull
    @Positive
    private BigDecimal price;

    @Positive
    private BigDecimal oldPrice;

    @Positive
    private BigDecimal discount;

    private MultipartFile imageFile; // Changed from imageUrl to handle file upload

    private boolean inStock;
    @Min(0)
    private int quantity;

    private String brand;

    @NotNull
    private ProductCategory category;

    private TaxClass taxClass;


    private List<MultipartFile> photoFiles;

    private List<String> removedGalleryImages;

    // private Set<Long> categoryIds;

    @NotEmpty
    private List<Long> subCategoryIds;



}
