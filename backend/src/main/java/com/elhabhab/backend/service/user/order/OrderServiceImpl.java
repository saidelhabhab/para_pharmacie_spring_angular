package com.elhabhab.backend.service.user.order;


import com.elhabhab.backend.dto.request.OrderRequestDTO;
import com.elhabhab.backend.dto.request.OrderItemRequestDTO;
import com.elhabhab.backend.dto.response.OrderResponseDTO;
import com.elhabhab.backend.entity.*;
import com.elhabhab.backend.enums.OrderStatus;
import com.elhabhab.backend.mapper.OrderMapper;
import com.elhabhab.backend.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CouponRepository couponRepository;

    private final OrderMapper orderMapper;

    @Override
    public OrderResponseDTO placeOrder(OrderRequestDTO orderRequest) {
        User user = userRepository.findByUserId(orderRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Order order = new Order();
        order.setOrderId(UUID.randomUUID());
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDTO : orderRequest.getItems()) {
            Product product = productRepository.findByProductId(itemDTO.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(orderItem.getTotalPrice());
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        // ✅ Apply coupon if present
        if (orderRequest.getCouponCode() != null && !orderRequest.getCouponCode().isEmpty()) {
            Coupon coupon = couponRepository.findByCode(orderRequest.getCouponCode())
                    .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));

            if (!coupon.isActive()) {
                throw new IllegalStateException("Coupon is not active");
            }

            if (coupon.getValidUntil().isBefore(LocalDateTime.now())) {
                throw new IllegalStateException("Coupon has expired");
            }

            if (coupon.getUsageLimit() > 0 && coupon.getUsedCount() >= coupon.getUsageLimit()) {
                throw new IllegalStateException("Coupon usage limit has been reached");
            }

            BigDecimal discountAmount;

            if (coupon.isPercentage()) {
                discountAmount = totalAmount
                        .multiply(coupon.getDiscountAmount())
                        .divide(BigDecimal.valueOf(100));
            } else {
                discountAmount = coupon.getDiscountAmount();
            }

            if (discountAmount.compareTo(totalAmount) > 0) {
                discountAmount = totalAmount;
            }

            order.setDiscountAmount(discountAmount);
            order.setTotalAmount(totalAmount.subtract(discountAmount));
            order.setCoupon(coupon);

            // ✅ Incrémenter le nombre d'utilisations
            coupon.setUsedCount(coupon.getUsedCount() + 1);
            couponRepository.save(coupon);
        }

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }

    @Override
    public OrderResponseDTO getOrderById(UUID orderId) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        return orderMapper.toDto(order);
    }

    @Override
    public List<OrderResponseDTO> getOrdersByUserId(UUID userId) {
        List<Order> orders = orderRepository.findByUserUserId(userId);
        return orders.stream().map(orderMapper::toDto).toList();
    }

    @Override
    public void cancelOrder(UUID orderId) {
        Order order = orderRepository.findByOrderId(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}
