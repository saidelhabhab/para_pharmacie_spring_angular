package com.elhabhab.backend.service.user.order;


import com.elhabhab.backend.dto.request.OrderRequestDTO;
import com.elhabhab.backend.dto.response.OrderResponseDTO;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrderResponseDTO placeOrder(OrderRequestDTO orderRequest);
    OrderResponseDTO getOrderById(UUID orderId);
    List<OrderResponseDTO> getOrdersByUserId(UUID userId);
    void cancelOrder(UUID orderId);
}
