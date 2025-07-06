package com.elhabhab.backend.service.user.address;


import com.elhabhab.backend.dto.request.UserAddressRequestDTO;
import com.elhabhab.backend.dto.response.UserAddressResponseDTO;

import java.util.List;
import java.util.UUID;

public interface UserAddressService {


    public List<UserAddressResponseDTO> getAddresses(UUID userId);

    public UserAddressResponseDTO addAddress(UUID userId, UserAddressRequestDTO dto) ;

    public void deleteAddress(Long addressId) ;
}
