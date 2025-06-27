package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Optional<Wishlist> findByWishlistId(UUID wishlistId);

    List<Wishlist> findAllByUser_UserId(UUID userId);

    int countByUser_UserId(UUID userId);
}
