package com.elhabhab.backend.service.admin.users;


import com.elhabhab.backend.dto.request.UserRequestDTO;
import com.elhabhab.backend.dto.response.UserResponseDTO;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.exception.ResourceNotFoundException;
import com.elhabhab.backend.exception.ValidationException;
import com.elhabhab.backend.mapper.UserMapper;
import com.elhabhab.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    @Override
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new ValidationException("Email already in use");
        }

        User user = userMapper.toEntity(userRequestDTO);
        user.setPassword(userRequestDTO.getPassword());
        user.setUserId(UUID.randomUUID());
        user.setAccountNotExpired(true);
        user.setEnable(false); // Users should verify email first
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setCreatedTime(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        log.info("Created new user with ID: {}", savedUser.getId());
        return userMapper.toResponseDTO(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        return userMapper.toResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserByUserId(UUID userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with userId: " + userId));
        return userMapper.toResponseDTO(user);
    }


    @Override
    @Transactional(readOnly = true)
    public User getEntityByUserId(UUID userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponseDTO> getAllUsers(Pageable pageable) {
        Page<User> usersPage = userRepository.findAll(pageable);
        return usersPage.map(userMapper::toResponseDTO);
    }

    @Override
    public UserResponseDTO updateUser(UUID userId, UserRequestDTO userRequestDTO) {
        User existingUser = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with userId: " + userId));

        // Update allowed fields
        existingUser.setFirstName(userRequestDTO.getFirstName());
        existingUser.setLastName(userRequestDTO.getLastName());
        existingUser.setPhone(userRequestDTO.getPhone());
        existingUser.setAddress(userRequestDTO.getAddress());
        existingUser.setAboutMe(userRequestDTO.getAboutMe());
        existingUser.setCountry(userRequestDTO.getCountry());

        if (userRequestDTO.getProfileImgBase64() != null && !userRequestDTO.getProfileImgBase64().isEmpty()) {
            existingUser.setProfileImg(userMapper.convertBase64ToBytes(userRequestDTO.getProfileImgBase64()));
        }

        if (userRequestDTO.getPassword() != null && !userRequestDTO.getPassword().isEmpty()) {
            existingUser.setPassword(userRequestDTO.getPassword());
        }

        User updatedUser = userRepository.save(existingUser);
        log.info("Updated user with ID: {}", updatedUser.getId());
        return userMapper.toResponseDTO(updatedUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with userId: " + userId));
        userRepository.delete(user);
        log.info("Deleted user with ID: {}", user.getId());
    }

    @Override
    public void enableUser(UUID userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with userId: " + userId));
        user.setEnable(true);
        userRepository.save(user);
        log.info("Enabled user with ID: {}", user.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getCurrentUser() {
       // String username = authenticationFacade.getAuthentication().getName();
       // User user = userRepository.findByEmail(username)
       //         .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
       // return userMapper.toResponseDTO(user);
        return null;
    }

    @Override
    public Page<UserResponseDTO> searchUsers(String query, Pageable pageable) {
        Page<User> users = userRepository.searchByKeyword(query.toLowerCase(), pageable);
        return users.map(userMapper::toResponseDTO);
    }
}