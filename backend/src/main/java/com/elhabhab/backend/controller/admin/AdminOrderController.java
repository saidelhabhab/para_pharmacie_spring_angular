package com.elhabhab.backend.controller.admin;


import com.elhabhab.backend.dto.response.OrderResponseDTO;
import com.elhabhab.backend.enums.OrderStatus;
import com.elhabhab.backend.service.user.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping("/paginated")
    public ResponseEntity<Page<OrderResponseDTO>> getAllOrdersPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<OrderResponseDTO> orders = orderService.getAllOrdersPaginated(page, size);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/statuses")
    public ResponseEntity<OrderStatus[]> getAllStatuses() {
        return ResponseEntity.ok(OrderStatus.values());
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Void> updateOrderStatus(
            @PathVariable UUID orderId,
            @RequestParam String status
    ) {
        orderService.updateOrderStatus(orderId, OrderStatus.valueOf(status));
        return ResponseEntity.ok().build();
    }


}

