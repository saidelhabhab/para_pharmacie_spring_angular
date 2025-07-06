package com.elhabhab.backend.service.user.wishlist;




import com.elhabhab.backend.dto.request.WishlistRequestDTO;
import com.elhabhab.backend.dto.response.WishlistResponseDTO;

import java.util.List;
import java.util.UUID;

public interface WishlistService {
    WishlistResponseDTO addToWishlist(WishlistRequestDTO dto);
    void removeFromWishlist(UUID wishlistId);
    List<WishlistResponseDTO> getUserWishlist(UUID userId);

    public int getWishlistCount(UUID userId);
}
