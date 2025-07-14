package com.elhabhab.backend.mapper;
import com.elhabhab.backend.dto.request.SubCategoryRequestDTO;
import com.elhabhab.backend.dto.response.SubCategoryResponseDTO;
import com.elhabhab.backend.entity.SubCategory;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface SubCategoryMapper {

    SubCategory toEntity(SubCategoryRequestDTO dto);

    SubCategoryResponseDTO toDto(SubCategory entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(SubCategoryRequestDTO dto, @MappingTarget SubCategory entity);
}