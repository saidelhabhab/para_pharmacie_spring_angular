package com.elhabhab.backend.service.user.cart;

import com.elhabhab.backend.dto.request.CartItemRequestDTO;
import com.elhabhab.backend.dto.response.CartResponseDTO;

import java.util.UUID;

public interface CartService {
    CartResponseDTO addToCart(Long userId, CartItemRequestDTO dto);
    CartResponseDTO getCart(Long userId);
    void removeItem(Long userId, UUID productId);
    CartResponseDTO updateItemQuantity(Long userId, CartItemRequestDTO dto) ;
    void clearCart(Long userId);
    }

