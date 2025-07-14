package com.elhabhab.backend.service.admin.category;

import com.elhabhab.backend.dto.request.SubCategoryRequestDTO;
import com.elhabhab.backend.dto.response.SubCategoryResponseDTO;
import com.elhabhab.backend.entity.SubCategory;
import com.elhabhab.backend.enums.ProductCategory;
import com.elhabhab.backend.exception.ResourceNotFoundException;
import com.elhabhab.backend.mapper.SubCategoryMapper;
import com.elhabhab.backend.repository.SubCategoryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubCategoryServiceImpl implements SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;
    private final SubCategoryMapper subCategoryMapper;

    @Override
    public SubCategoryResponseDTO create(SubCategoryRequestDTO dto) {
        SubCategory entity = subCategoryMapper.toEntity(dto);
        SubCategory saved = subCategoryRepository.save(entity);
        return subCategoryMapper.toDto(saved);
    }

    @Override
    public SubCategoryResponseDTO update(Long id, SubCategoryRequestDTO dto) {
        SubCategory subCategory = subCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SubCategory not found"));

        subCategoryMapper.updateFromDto(dto, subCategory);
        SubCategory updated = subCategoryRepository.save(subCategory);
        return subCategoryMapper.toDto(updated);
    }

    @Override
    public void delete(Long id) {
        if (!subCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("SubCategory not found");
        }
        subCategoryRepository.deleteById(id);
    }

    @Override
    public List<SubCategoryResponseDTO> getAll() {
        return subCategoryRepository.findAll()
                .stream()
                .map(subCategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SubCategoryResponseDTO getById(Long id) {
        SubCategory subCategory = subCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SubCategory not found"));
        return subCategoryMapper.toDto(subCategory);
    }

    @Override
    public List<SubCategoryResponseDTO> getByParentCategory(ProductCategory category) {
        return subCategoryRepository.findByParentCategory(category)
                .stream()
                .map(subCategoryMapper::toDto)
                .collect(Collectors.toList());
    }

}
