package com.elhabhab.backend.repository;


import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.enums.UserRole;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    User findByRole(UserRole userRole);

    Optional<User> findByEmailAndProvidedId(String username,String providerId);

    @Query("UPDATE User u SET u.isEnable = true WHERE u.id = ?1")
    @Modifying
    @Transactional
    public  void enable(Long id);

    @Query("SELECT u FROM User u WHERE u.codeVerification = ?1")
    public User findByCodeVerification(String code);


    long countByRole(UserRole role);

    Optional<User> findByUserId(UUID userId);
    boolean existsByEmail(String email);

}
