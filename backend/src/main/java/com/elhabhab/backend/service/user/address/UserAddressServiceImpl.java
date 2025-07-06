package com.elhabhab.backend.service.user.address;

import com.elhabhab.backend.dto.request.UserAddressRequestDTO;
import com.elhabhab.backend.dto.response.UserAddressResponseDTO;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.entity.UserAddress;
import com.elhabhab.backend.mapper.UserAddressMapper;
import com.elhabhab.backend.repository.UserAddressRepository;
import com.elhabhab.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserAddressServiceImpl implements UserAddressService {

    private final UserRepository userRepository;
    private final UserAddressRepository addressRepository;
    private final UserAddressMapper mapper;


    @Override
    public List<UserAddressResponseDTO> getAddresses(UUID userId) {
        List<UserAddress> addresses = addressRepository.findByUserUserId(userId);
        return mapper.toDtoList(addresses);
    }

    @Override
    public UserAddressResponseDTO addAddress(UUID userId, UserAddressRequestDTO dto) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        UserAddress address = mapper.toEntity(dto, user); // ✅ propre
        UserAddress saved = addressRepository.save(address);

        return mapper.toDto(saved);
    }


    @Override
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}
