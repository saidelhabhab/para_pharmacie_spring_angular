package com.elhabhab.backend.service.admin.coupon;

import com.elhabhab.backend.dto.request.CouponRequestDTO;
import com.elhabhab.backend.dto.response.CouponResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CouponService {

    CouponResponseDTO createCoupon(CouponRequestDTO dto);

    CouponResponseDTO updateCoupon(UUID couponId, CouponRequestDTO dto);

    CouponResponseDTO getCouponById(UUID couponId);

    boolean deleteCoupon(UUID couponId);

    Page<CouponResponseDTO> getCouponsPage(Pageable pageable);

    CouponResponseDTO applyCouponToCart(String code, UUID userId);
}
