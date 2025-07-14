package com.elhabhab.backend.service.admin.category;
import com.elhabhab.backend.dto.request.SubCategoryRequestDTO;
import com.elhabhab.backend.dto.response.SubCategoryResponseDTO;
import com.elhabhab.backend.enums.ProductCategory;

import java.util.List;

public interface SubCategoryService {
    SubCategoryResponseDTO create(SubCategoryRequestDTO dto);

    SubCategoryResponseDTO update(Long id, SubCategoryRequestDTO dto);

    void delete(Long id);

    List<SubCategoryResponseDTO> getAll();

    SubCategoryResponseDTO getById(Long id);

    List<SubCategoryResponseDTO> getByParentCategory(ProductCategory category);

}