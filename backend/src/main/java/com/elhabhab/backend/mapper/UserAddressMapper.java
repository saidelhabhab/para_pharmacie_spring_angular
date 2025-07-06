package com.elhabhab.backend.mapper;

import com.elhabhab.backend.dto.request.UserAddressRequestDTO;
import com.elhabhab.backend.dto.response.UserAddressResponseDTO;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.entity.UserAddress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserAddressMapper {

    @Mapping(source = "user.userId", target = "userId") // ✅ Corrigé
    UserAddressResponseDTO toDto(UserAddress address);

    List<UserAddressResponseDTO> toDtoList(List<UserAddress> addresses);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", source = "user") // ✅ On passe l'utilisateur dans le mapper
    UserAddress toEntity(UserAddressRequestDTO dto, User user);
}
