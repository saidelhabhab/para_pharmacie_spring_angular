package com.elhabhab.backend.service.user.order;


import com.elhabhab.backend.dto.request.OrderRequestDTO;
import com.elhabhab.backend.dto.request.OrderItemRequestDTO;
import com.elhabhab.backend.dto.response.OrderResponseDTO;
import com.elhabhab.backend.entity.*;
import com.elhabhab.backend.enums.OrderStatus;
import com.elhabhab.backend.mapper.OrderMapper;
import com.elhabhab.backend.repository.*;
import com.elhabhab.backend.service.user.cart.CartService;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    private final UserAddressRepository userAddressRepository;

    private final OrderMapper orderMapper;

    private final CartService cartService;

    private final  NotificationRepository notificationRepository;

    private final JavaMailSender mailSender;


    @Override
    public OrderResponseDTO placeOrder(OrderRequestDTO orderRequest) {
        User user = userRepository.findByUserId(orderRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Long addressId = orderRequest.getAddressId();
        if (addressId == null) {
            throw new IllegalArgumentException("userAddressId cannot be null");
        }
        UserAddress userAddress = userAddressRepository.findById(addressId)
                .orElseThrow(() -> new EntityNotFoundException("User address not found"));


        Order order = new Order();
        order.setOrderId(UUID.randomUUID());
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setUserAddress(userAddress);
        order.setStatus(OrderStatus.PENDING);
        order.setDeliveryOption(orderRequest.getDeliveryOption());
        order.setPaymentMethod(orderRequest.getPaymentMethod());

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

        // ✅ Appliquer coupon en premier
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

            totalAmount = totalAmount.subtract(discountAmount);

            order.setDiscountAmount(discountAmount);
            order.setCoupon(coupon);

            // ✅ Incrémenter le nombre d’utilisations du coupon
            coupon.setUsedCount(coupon.getUsedCount() + 1);
            couponRepository.save(coupon);
        }

        // ✅ Ajouter 30 MAD si livraison express
        if ("express".equalsIgnoreCase(orderRequest.getDeliveryOption())) {
            totalAmount = totalAmount.add(BigDecimal.valueOf(30));
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        // ✅ Supprimer tous les articles du panier de l'utilisateur
        cartService.clearCart(user.getId());

        // 🔔 Notification dans l'application
        notifyUserAboutOrder(user, savedOrder);

        // 📧 Email de confirmation
        notifyEmailUserAboutOrder(user, savedOrder);


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

    private void notifyUserAboutOrder(User user, Order order) {
        String message = "📦 Votre commande #" + order.getOrderId() + " a été confirmée !\n" +
                "💰 Montant total : " + order.getTotalAmount() + " DH\n" +
                "🚚 Livraison : " + order.getDeliveryOption() + "\n" +
                "💳 Paiement : " + order.getPaymentMethod() + "\n" +
                "🕒 Date : " + order.getOrderDate().toLocalDate() + "\n" +
                "🙏 Merci pour votre achat sur ParaPharmacie 💚";

        Notification notification = new Notification();
        notification.setNotificationId(UUID.randomUUID());
        notification.setDescription(message);
        notification.setCreatedDateTime(LocalDateTime.now());
        notification.setRead(false);
        notification.setUser(user);

        notificationRepository.save(notification);
    }


    private void notifyEmailUserAboutOrder(User user, Order order) {
        String subject = "✅ Confirmation de votre commande #" + order.getOrderId();
        String content = """
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #27ae60;">Commande confirmée ✅</h2>
                <p>Bonjour %s,</p>
                <p>Merci pour votre commande sur <strong>ParaPharmacie</strong> 💚</p>
                <p><strong>📦 Numéro de commande :</strong> %s</p>
                <p><strong>💰 Total :</strong> %.2f DH</p>
                <p><strong>🚚 Livraison :</strong> %s</p>
                <p><strong>💳 Paiement :</strong> %s</p>
                <p><strong>📅 Date :</strong> %s</p>
                <hr />
                <p>Nous vous informerons dès que votre commande sera expédiée.</p>
                <p>Merci pour votre confiance !</p>
                <p style="font-size: 12px; color: #999;">ParaPharmacie Team</p>
            </div>
        </body>
        </html>
    """.formatted(
                user.getLastName(),
                order.getOrderId(),
                order.getTotalAmount(),
                order.getDeliveryOption(),
                order.getPaymentMethod(),
                order.getOrderDate().toLocalDate()
        );

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("❌ Échec envoi email de confirmation à " + user.getEmail() + " : " + e.getMessage());
        }
    }


}
