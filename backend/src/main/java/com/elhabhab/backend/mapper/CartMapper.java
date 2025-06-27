package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.response.CartItemResponseDTO;
import com.elhabhab.backend.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CartMapper {

    @Mapping(source = "product.productId", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    @Mapping(source = "product.price", target = "price")
    CartItemResponseDTO toDto(CartItem item);

    List<CartItemResponseDTO> toDtoList(List<CartItem> items);
}
