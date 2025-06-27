package com.elhabhab.backend.mapper;


import com.elhabhab.backend.dto.response.WishlistResponseDTO;
import com.elhabhab.backend.entity.Wishlist;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WishlistMapper {

    @Mapping(source = "product.productId", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.imagePath", target = "imageUrl")
    @Mapping(source = "user.userId", target = "userId")
    WishlistResponseDTO toDto(Wishlist wishlist);

    List<WishlistResponseDTO> toDtoList(List<Wishlist> wishlists);
}
