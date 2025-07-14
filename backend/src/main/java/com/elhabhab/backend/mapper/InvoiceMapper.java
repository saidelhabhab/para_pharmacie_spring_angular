package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.response.InvoiceResponseDTO;
import com.elhabhab.backend.entity.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    @Mapping(source = "order.orderId", target = "orderId")
    @Mapping(source = "order.user.firstName", target = "firstName")
    @Mapping(source = "order.user.lastName", target = "lastName")
    @Mapping(source = "order.user.email", target = "userEmail")
    InvoiceResponseDTO toDto(Invoice invoice);


    Invoice toEntity(InvoiceResponseDTO dto);
}