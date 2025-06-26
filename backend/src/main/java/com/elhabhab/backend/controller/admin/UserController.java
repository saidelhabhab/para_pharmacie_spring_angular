package com.elhabhab.backend.controller.admin;

import com.elhabhab.backend.dto.request.UserRequestDTO;
import com.elhabhab.backend.dto.response.UserResponseDTO;
import com.elhabhab.backend.service.admin.users.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO response = userService.createUser(userRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        UserResponseDTO response = userService.getUserById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> getUserByUserId(@PathVariable UUID userId) {
        UserResponseDTO response = userService.getUserByUserId(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> responses = userService.getAllUsers();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/all-users")
    public ResponseEntity<Page<UserResponseDTO>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdTime,desc") String[] sort) {

        Pageable pageable = PageRequest.of(page, size, parseSort(sort));
        Page<UserResponseDTO> usersPage = userService.getAllUsers(pageable);
        return ResponseEntity.ok(usersPage);
    }

    private Sort parseSort(String[] sort) {
        if (sort.length >= 2) {
            return Sort.by(new Sort.Order(Sort.Direction.fromString(sort[1]), sort[0]));
        } else if (sort.length == 1) {
            return Sort.by(sort[0]);
        }
        return Sort.unsorted();
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable UUID userId,
            @Valid @RequestBody UserRequestDTO userRequestDTO) {
        UserResponseDTO response = userService.updateUser(userId, userRequestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{userId}/enable")
    public ResponseEntity<Void> enableUser(@PathVariable UUID userId) {
        userService.enableUser(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        UserResponseDTO response = userService.getCurrentUser();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/profile-image")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable UUID userId) {
        UserResponseDTO user = userService.getUserByUserId(userId);
        if (user.getProfileImgUrl() == null) {
            return ResponseEntity.notFound().build();
        }

        // In a real implementation, you would fetch the image bytes from storage
        // For this example, we're just returning a 200 with the URL in the header
        return ResponseEntity.ok()
                .header("X-Image-Url", user.getProfileImgUrl())
                .build();
    }
}