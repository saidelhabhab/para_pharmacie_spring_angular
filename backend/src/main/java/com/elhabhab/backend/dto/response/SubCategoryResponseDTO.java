package com.elhabhab.backend.dto.response;


import com.elhabhab.backend.enums.ProductCategory;
import lombok.Data;

@Data
public class SubCategoryResponseDTO {
    private Long id;
    private String name;
    private ProductCategory parentCategory;
}