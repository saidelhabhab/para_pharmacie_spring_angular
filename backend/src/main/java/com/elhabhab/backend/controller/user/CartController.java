package com.elhabhab.backend.controller.user;

import com.elhabhab.backend.dto.request.CartItemRequestDTO;
import com.elhabhab.backend.dto.response.CartResponseDTO;
import com.elhabhab.backend.service.user.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/{userId}/add")
    public ResponseEntity<CartResponseDTO> addToCart(
            @PathVariable UUID userId,
            @RequestBody CartItemRequestDTO dto) {
        return ResponseEntity.ok(cartService.addToCart(userId, dto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponseDTO> getCart(@PathVariable UUID userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable UUID userId,
            @PathVariable UUID productId) {
        cartService.removeItem(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<CartResponseDTO> updateCartItemQuantity(
            @PathVariable UUID userId,
            @RequestBody CartItemRequestDTO dto) {
        return ResponseEntity.ok(cartService.updateItemQuantity(userId, dto));
    }

}
