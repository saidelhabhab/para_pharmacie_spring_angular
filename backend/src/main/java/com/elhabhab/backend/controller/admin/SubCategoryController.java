package com.elhabhab.backend.controller.admin;


import com.elhabhab.backend.dto.request.SubCategoryRequestDTO;
import com.elhabhab.backend.dto.response.SubCategoryResponseDTO;

import com.elhabhab.backend.enums.ProductCategory;
import com.elhabhab.backend.service.admin.category.SubCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/categories")
@RequiredArgsConstructor
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @PostMapping
    public ResponseEntity<SubCategoryResponseDTO> create(@RequestBody @Valid SubCategoryRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subCategoryService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubCategoryResponseDTO> update(@PathVariable Long id, @RequestBody @Valid SubCategoryRequestDTO dto) {
        return ResponseEntity.ok(subCategoryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        subCategoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SubCategoryResponseDTO>> getAll() {
        return ResponseEntity.ok(subCategoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubCategoryResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(subCategoryService.getById(id));
    }

    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<SubCategoryResponseDTO>> getByParentCategory(@PathVariable ProductCategory category) {
        return ResponseEntity.ok(subCategoryService.getByParentCategory(category));
    }
}

