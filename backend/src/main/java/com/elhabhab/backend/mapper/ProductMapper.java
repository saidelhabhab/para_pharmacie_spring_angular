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

    @Mapping(target = "imagePath", ignore = true) // We'll set this manually in the service
    Product toEntity(ProductRequestDTO dto);

    @Mapping(source = "imagePath", target = "imageUrl") // Map imagePath to imageUrl in DTO
    ProductResponseDTO toDto(Product entity);

    @Mapping(target = "imagePath", ignore = true) // We'll handle this manually in the service
    void updateProductFromDto(ProductRequestDTO dto, @MappingTarget Product entity);

    List<ProductResponseDTO> toDtoList(List<Product> entities);
}
