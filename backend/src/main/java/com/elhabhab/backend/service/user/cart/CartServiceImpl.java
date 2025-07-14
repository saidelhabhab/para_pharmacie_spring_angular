package com.elhabhab.backend.service.user.cart;

import com.elhabhab.backend.dto.request.CartItemRequestDTO;
import com.elhabhab.backend.dto.response.CartResponseDTO;
import com.elhabhab.backend.entity.Cart;
import com.elhabhab.backend.entity.CartItem;
import com.elhabhab.backend.entity.Product;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.mapper.CartMapper;
import com.elhabhab.backend.repository.CartRepository;
import com.elhabhab.backend.repository.ProductRepository;
import com.elhabhab.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartMapper cartMapper;

    @Override
    public CartResponseDTO addToCart(UUID userId, CartItemRequestDTO dto) {
        Product product = productRepository.findByProductId(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser_UserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        CartItem existingItem = cart.getItems().stream()
                .filter(i -> i.getProduct().getProductId().equals(dto.getProductId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + dto.getQuantity());
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(dto.getQuantity());
            cart.getItems().add(item);
        }

        cart = cartRepository.save(cart);

        return CartResponseDTO.builder()
                .cartId(cart.getId())
                .userId(userId)
                .items(cartMapper.toDtoList(cart.getItems()))
                .message(existingItem != null ? "already_in_cart" : "added_new")
                .build();
    }

    @Override
    public CartResponseDTO getCart(UUID userId) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        return CartResponseDTO.builder()
                .cartId(cart.getId())
                .userId(userId)
                .items(cartMapper.toDtoList(cart.getItems()))
                .build();
    }

    @Override
    public void removeItem(UUID userId, UUID productId) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        cart.getItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        cartRepository.save(cart);
    }

    @Override
    public CartResponseDTO updateItemQuantity(UUID userId, CartItemRequestDTO dto) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getProductId().equals(dto.getProductId()))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Product not found in cart"));

        // Met à jour la quantité (assure-toi que la quantité soit > 0)
        if (dto.getQuantity() <= 0) {
            // Tu peux soit supprimer l’item, soit lever une exception, ici on supprime
            cart.getItems().remove(item);
        } else {
            item.setQuantity(dto.getQuantity());
        }

        cartRepository.save(cart);

        return CartResponseDTO.builder()
                .cartId(cart.getId())
                .userId(userId)
                .items(cartMapper.toDtoList(cart.getItems()))
                .build();
    }

    @Override
    public void clearCart(UUID userId) {
        Cart cart = cartRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));

        cart.getItems().clear(); // Vide la liste des produits du panier
        cartRepository.save(cart);
    }


}
