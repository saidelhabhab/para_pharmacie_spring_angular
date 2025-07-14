package com.elhabhab.backend.service.admin.product;




import com.elhabhab.backend.dto.request.ProductRequestDTO;
import com.elhabhab.backend.dto.response.ProductResponseDTO;
import com.elhabhab.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO dto);

    ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO dto);

    ProductResponseDTO getProductById(UUID productId);

    void deleteProduct(UUID productId);

    List<ProductResponseDTO> getAllProducts();

    Page<ProductResponseDTO> getProductsPage(Pageable pageable);

    ProductResponseDTO updateProductDiscount(UUID productId, ProductRequestDTO dto);

}
