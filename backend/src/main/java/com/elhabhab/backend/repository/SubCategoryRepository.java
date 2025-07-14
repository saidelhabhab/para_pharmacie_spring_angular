package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.SubCategory;
import com.elhabhab.backend.enums.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {

    List<SubCategory> findByParentCategory(ProductCategory category);

    boolean existsByName(String name);
}