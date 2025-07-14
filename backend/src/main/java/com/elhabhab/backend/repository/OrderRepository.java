package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(UUID orderId);

    List<Order> findByUser_UserId(UUID userId);

    Page<Order> findByUser_UserId(UUID userId, Pageable pageable);

}
