package com.elhabhab.backend.controller.user;


import com.elhabhab.backend.dto.request.WishlistRequestDTO;
import com.elhabhab.backend.dto.response.WishlistResponseDTO;
import com.elhabhab.backend.service.user.wishlist.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping
    public WishlistResponseDTO addToWishlist(@RequestBody WishlistRequestDTO dto) {
        return wishlistService.addToWishlist(dto);
    }

    @DeleteMapping("/{wishlistId}")
    public void removeFromWishlist(@PathVariable UUID wishlistId) {
        wishlistService.removeFromWishlist(wishlistId);
    }

    @GetMapping("/{userId}")
    public List<WishlistResponseDTO> getUserWishlist(@PathVariable UUID userId) {
        return wishlistService.getUserWishlist(userId);
    }

    @GetMapping("/count/{userId}")
    public int getWishlistCount(@PathVariable UUID userId) {
        return wishlistService.getWishlistCount(userId);
    }
}
