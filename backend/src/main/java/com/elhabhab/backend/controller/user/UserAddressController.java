package com.elhabhab.backend.controller.user;

import com.elhabhab.backend.dto.request.UserAddressRequestDTO;
import com.elhabhab.backend.dto.response.UserAddressResponseDTO;
import com.elhabhab.backend.service.user.address.UserAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user/addresses")
@RequiredArgsConstructor
public class UserAddressController {

    private final UserAddressService addressService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserAddressResponseDTO>> getUserAddresses(@PathVariable UUID userId) {
        return ResponseEntity.ok(addressService.getAddresses(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<UserAddressResponseDTO> addAddress(
            @PathVariable UUID userId,
            @RequestBody @Valid UserAddressRequestDTO dto
    ) {
        return ResponseEntity.ok(addressService.addAddress(userId, dto));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.noContent().build();
    }
}
