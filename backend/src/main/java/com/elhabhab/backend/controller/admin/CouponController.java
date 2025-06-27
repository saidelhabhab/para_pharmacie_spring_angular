package com.elhabhab.backend.controller.admin;

import com.elhabhab.backend.dto.request.CouponRequestDTO;
import com.elhabhab.backend.dto.response.CouponResponseDTO;
import com.elhabhab.backend.service.admin.coupon.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/coupons")
@RequiredArgsConstructor
public class CouponController {

    private final CouponService couponService;

    @PostMapping
    public ResponseEntity<CouponResponseDTO> createCoupon(@Valid @RequestBody CouponRequestDTO dto) {
        return ResponseEntity.ok(couponService.createCoupon(dto));
    }

    @PutMapping("/{couponId}")
    public ResponseEntity<CouponResponseDTO> updateCoupon(@PathVariable UUID couponId,
                                                          @Valid @RequestBody CouponRequestDTO dto) {
        return ResponseEntity.ok(couponService.updateCoupon(couponId, dto));
    }

    @GetMapping("/{couponId}")
    public ResponseEntity<CouponResponseDTO> getCouponById(@PathVariable UUID couponId) {
        return ResponseEntity.ok(couponService.getCouponById(couponId));
    }

    @DeleteMapping("/{couponId}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable UUID couponId) {
        couponService.deleteCoupon(couponId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<CouponResponseDTO>> getCoupons(Pageable pageable) {
        return ResponseEntity.ok(couponService.getCouponsPage(pageable));
    }

    @PostMapping("/apply")
    public ResponseEntity<CouponResponseDTO> applyCoupon(@RequestParam String code, @RequestParam Long userId) {
        return ResponseEntity.ok(couponService.applyCouponToCart(code, userId));
    }
}
