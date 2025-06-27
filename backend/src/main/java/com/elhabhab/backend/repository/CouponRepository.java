package com.elhabhab.backend.repository;

import com.elhabhab.backend.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {

    Optional<Coupon> findByCouponId(UUID couponId);

    Optional<Coupon> findByCode(String code);
}
