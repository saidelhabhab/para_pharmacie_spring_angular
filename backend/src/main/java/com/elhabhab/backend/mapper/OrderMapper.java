package com.elhabhab.backend.mapper;


import com.elhabhab.backend.dto.request.OrderItemRequestDTO;
import com.elhabhab.backend.dto.request.OrderRequestDTO;
import com.elhabhab.backend.dto.response.OrderItemResponseDTO;
import com.elhabhab.backend.dto.response.OrderResponseDTO;
import com.elhabhab.backend.entity.Order;
import com.elhabhab.backend.entity.OrderItem;
import com.elhabhab.backend.entity.User;

import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "userAddress", ignore = true)  // Ignore ici !
    @Mapping(target = "orderItems", ignore = true)
    @Mapping(target = "orderDate", ignore = true)
    @Mapping(target = "totalAmount", ignore = true)
    @Mapping(target = "status", ignore = true)
    Order toEntity(OrderRequestDTO dto, User user);


    @Mapping(target = "product", ignore = true)
    OrderItem toEntity(OrderItemRequestDTO dto);

    @Mapping(source = "order.orderId", target = "orderId")
    @Mapping(source = "order.user.userId", target = "userId")
    @Mapping(source = "order.orderItems", target = "items")
    @Mapping(source = "order.userAddress.id", target = "addressId") // <-- CLÉ !
    @Mapping(source = "coupon.code", target = "couponCode")
    @Mapping(source = "order.discountAmount", target = "discountAmount")
    OrderResponseDTO toDto(Order order);

    @Mapping(source = "product.productId", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    OrderItemResponseDTO toDto(OrderItem orderItem);



    List<OrderItemResponseDTO> toDtoList(List<OrderItem> orderItems);


}
