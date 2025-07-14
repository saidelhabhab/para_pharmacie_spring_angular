package com.elhabhab.backend.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDTO {
    private Long cartId;
    private UUID userId;
    private List<CartItemResponseDTO> items;

    private String message;  // <-- Ajoute ce champ

}
