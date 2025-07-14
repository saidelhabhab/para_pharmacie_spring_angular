package com.elhabhab.backend.service.user.cart;

import com.elhabhab.backend.dto.request.CartItemRequestDTO;
import com.elhabhab.backend.dto.response.CartResponseDTO;

import java.util.UUID;

public interface CartService {
    CartResponseDTO addToCart(UUID userId, CartItemRequestDTO dto);
    CartResponseDTO getCart(UUID userId);
    void removeItem(UUID userId, UUID productId);
    CartResponseDTO updateItemQuantity(UUID userId, CartItemRequestDTO dto) ;
    void clearCart(UUID userId);
    }

