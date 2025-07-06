package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.request.CouponRequestDTO;
import com.elhabhab.backend.dto.response.CouponResponseDTO;
import com.elhabhab.backend.entity.Coupon;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CouponMapper {

    Coupon toEntity(CouponRequestDTO dto);

    CouponResponseDTO toDto(Coupon entity);

    void updateCouponFromDto(CouponRequestDTO dto, @MappingTarget Coupon entity);

    List<CouponResponseDTO> toDtoList(List<Coupon> entities);
}
