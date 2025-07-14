package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

   // Optional<Cart> findByUserId(Long userId);

    Optional<Cart> findByUser_UserId(UUID userId);

}
