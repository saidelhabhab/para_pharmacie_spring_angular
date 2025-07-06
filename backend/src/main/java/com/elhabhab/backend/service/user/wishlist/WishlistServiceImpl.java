package com.elhabhab.backend.service.user.wishlist;


import com.elhabhab.backend.dto.request.WishlistRequestDTO;
import com.elhabhab.backend.dto.response.WishlistResponseDTO;
import com.elhabhab.backend.entity.Product;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.entity.Wishlist;
import com.elhabhab.backend.mapper.WishlistMapper;
import com.elhabhab.backend.repository.ProductRepository;
import com.elhabhab.backend.repository.UserRepository;
import com.elhabhab.backend.repository.WishlistRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WishlistMapper wishlistMapper;

    @Override
    public WishlistResponseDTO addToWishlist(WishlistRequestDTO dto) {
        Product product = productRepository.findByProductId(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        User user = userRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Wishlist wishlist = Wishlist.builder()
                .wishlistId(UUID.randomUUID())
                .product(product)
                .user(user)
                .addedDate(LocalDateTime.now())
                .build();

        return wishlistMapper.toDto(wishlistRepository.save(wishlist));
    }

    @Override
    public void removeFromWishlist(UUID wishlistId) {
        Wishlist wishlist = wishlistRepository.findByWishlistId(wishlistId)
                .orElseThrow(() -> new EntityNotFoundException("Wishlist item not found"));
        wishlistRepository.delete(wishlist);
    }

    @Override
    public List<WishlistResponseDTO> getUserWishlist(UUID userId) {
        return wishlistMapper.toDtoList(wishlistRepository.findAllByUser_UserId(userId));
    }


    @Override
    public int getWishlistCount(UUID userId) {
        return wishlistRepository.countByUser_UserId(userId);
    }
}
