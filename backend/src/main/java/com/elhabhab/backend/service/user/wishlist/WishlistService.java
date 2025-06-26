package com.elhabhab.backend.service.user.wishlist;



import com.elhabhab.backend.dto.request.WishListDto;

import java.util.List;

public interface WishlistService {

    public WishListDto addProductToWishlist(WishListDto wishlistDto);

    public List<WishListDto> getWishlistByUserId(Long userId);

    public  void deleteWishlist(Long wishlistId);

    public int getWishlistCount(Long userId);
}
