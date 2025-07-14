package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.request.ProductRequestDTO;
import com.elhabhab.backend.dto.response.ProductResponseDTO;
import com.elhabhab.backend.entity.Product;
import com.elhabhab.backend.entity.SubCategory;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {



    @Mapping(target = "imagePath", ignore = true) // We'll set this manually
    @Mapping(target = "photos", ignore = true)     // We'll set photos manually
    @Mapping(target = "subCategories", ignore = true) // Will handle manually
    Product toEntity(ProductRequestDTO dto);

    @Mapping(source = "imagePath", target = "imageUrl")
    @Mapping(target = "photoUrls", expression = "java(entity.getPhotos() != null ? entity.getPhotos().stream().map(p -> p.getImagePath()).toList() : new java.util.ArrayList<>())")
    @Mapping(target = "subCategories", source = "subCategories")
    ProductResponseDTO toDto(Product entity);


    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "photos", ignore = true)
    void updateProductFromDto(ProductRequestDTO dto, @MappingTarget Product entity);

    List<ProductResponseDTO> toDtoList(List<Product> entities);





}


