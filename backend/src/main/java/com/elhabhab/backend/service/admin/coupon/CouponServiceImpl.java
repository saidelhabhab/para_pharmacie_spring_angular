package com.elhabhab.backend.service.admin.coupon;

import com.elhabhab.backend.dto.request.CouponRequestDTO;
import com.elhabhab.backend.dto.response.CouponResponseDTO;
import com.elhabhab.backend.entity.Coupon;
import com.elhabhab.backend.mapper.CouponMapper;
import com.elhabhab.backend.repository.CouponRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;
    private final CouponMapper couponMapper;

    @Override
    public CouponResponseDTO createCoupon(CouponRequestDTO dto) {
        if (couponRepository.findByCode(dto.getCode()).isPresent()) {
            throw new RuntimeException("Coupon code already exists");
        }
        Coupon coupon = couponMapper.toEntity(dto);
        coupon.setCouponId(UUID.randomUUID());
        return couponMapper.toDto(couponRepository.save(coupon));
    }

    @Override
    public CouponResponseDTO updateCoupon(UUID couponId, CouponRequestDTO dto) {
        Coupon coupon = couponRepository.findByCouponId(couponId)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));
        couponMapper.updateCouponFromDto(dto, coupon);
        return couponMapper.toDto(couponRepository.save(coupon));
    }

    @Override
    public CouponResponseDTO getCouponById(UUID couponId) {
        Coupon coupon = couponRepository.findByCouponId(couponId)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));
        return couponMapper.toDto(coupon);
    }

    @Override
    public boolean deleteCoupon(UUID couponId) {
        Coupon coupon = couponRepository.findByCouponId(couponId)
                .orElseThrow(() -> new EntityNotFoundException("Coupon not found"));
        couponRepository.delete(coupon);
        return true;
    }

    @Override
    public Page<CouponResponseDTO> getCouponsPage(Pageable pageable) {
        return couponRepository.findAll(pageable).map(couponMapper::toDto);
    }

    @Override
    public CouponResponseDTO applyCouponToCart(String code, Long userId) {
        Coupon coupon = couponRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Coupon code not found"));
        if (!coupon.isActive() ||
                coupon.getValidFrom().isAfter(LocalDateTime.now()) ||
                coupon.getValidUntil().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Coupon is not valid at this time");
        }
        if (coupon.getUsageLimit() > 0 && coupon.getUsedCount() >= coupon.getUsageLimit()) {
            throw new RuntimeException("Coupon usage limit exceeded");
        }

        // TODO: Apply coupon discount logic on user's cart here

        // Increment usage count
        coupon.setUsedCount(coupon.getUsedCount() + 1);
        couponRepository.save(coupon);

        return couponMapper.toDto(coupon);
    }
}
