package com.elhabhab.backend.dto.request;


import com.elhabhab.backend.enums.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SubCategoryRequestDTO {


    @NotBlank
    private String name;

    @NotNull
    private ProductCategory parentCategory;

}
