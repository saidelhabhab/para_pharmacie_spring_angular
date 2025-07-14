package com.elhabhab.backend.service.user.order;


import com.elhabhab.backend.dto.request.OrderRequestDTO;
import com.elhabhab.backend.dto.response.OrderResponseDTO;
import com.elhabhab.backend.enums.OrderStatus;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    OrderResponseDTO placeOrder(OrderRequestDTO orderRequest);
    OrderResponseDTO getOrderById(UUID orderId);
    List<OrderResponseDTO> getOrdersByUserId(UUID userId);
    void cancelOrder(UUID orderId);
    Page<OrderResponseDTO> getOrdersByUserIdPaginated(UUID userId, int page, int size);
    Page<OrderResponseDTO> getAllOrdersPaginated(int page, int size);


    public void updateOrderStatus(UUID orderId, OrderStatus newStatus);


}
