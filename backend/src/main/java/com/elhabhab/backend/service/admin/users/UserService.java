package com.elhabhab.backend.service.admin.users;

import com.elhabhab.backend.dto.request.UserRequestDTO;
import com.elhabhab.backend.dto.response.UserResponseDTO;
import com.elhabhab.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponseDTO createUser(UserRequestDTO userRequestDTO);
    UserResponseDTO getUserById(Long id);
    UserResponseDTO getUserByUserId(UUID userId);

    List<UserResponseDTO> getAllUsers();
    Page<UserResponseDTO> getAllUsers(Pageable pageable);

    UserResponseDTO updateUser(UUID userId, UserRequestDTO userRequestDTO);

    void deleteUser(UUID userId);

    void enableUser(UUID userId);

    UserResponseDTO getCurrentUser();

    User getEntityByUserId(UUID userId);

    public Page<UserResponseDTO> searchUsers(String query, Pageable pageable);

}