package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductId(UUID productId);


}

