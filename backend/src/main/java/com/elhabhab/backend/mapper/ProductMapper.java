package com.elhabhab.backend.mapper;



import com.elhabhab.backend.dto.request.ProductRequestDTO;
import com.elhabhab.backend.dto.response.ProductResponseDTO;
import com.elhabhab.backend.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    @Mapping(target = "imagePath", ignore = true) // We'll set this manually
    @Mapping(target = "photos", ignore = true)     // We'll set photos manually
    Product toEntity(ProductRequestDTO dto);

    @Mapping(source = "imagePath", target = "imageUrl")
    @Mapping(target = "photoUrls", expression = "java(entity.getPhotos() != null ? entity.getPhotos().stream().map(p -> p.getImagePath()).toList() : new java.util.ArrayList<>())")
    ProductResponseDTO toDto(Product entity);

    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "photos", ignore = true)
    void updateProductFromDto(ProductRequestDTO dto, @MappingTarget Product entity);

    List<ProductResponseDTO> toDtoList(List<Product> entities);
}


