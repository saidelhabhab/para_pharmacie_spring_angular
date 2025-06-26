package com.elhabhab.backend.service.admin.product;

import com.elhabhab.backend.dto.request.ProductRequestDTO;
import com.elhabhab.backend.dto.response.ProductResponseDTO;
import com.elhabhab.backend.entity.Product;
import com.elhabhab.backend.mapper.ProductMapper;
import com.elhabhab.backend.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Value("${product.image.upload-dir:uploads/products}")
    private String uploadDir;

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO dto) {
        Product product = productMapper.toEntity(dto);
        product.setProductId(UUID.randomUUID());
        product.setCreatedTime(LocalDateTime.now());

        if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
            String imagePath = saveImageToFileSystem(dto.getImageFile());
            product.setImagePath(imagePath);
        }

        Product saved = productRepository.save(product);
        return productMapper.toDto(saved);
    }

    @Override
    public ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO dto) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        productMapper.updateProductFromDto(dto, product);

        if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
            // 🔁 Supprimer ancienne image si existante
            deleteImageFromFileSystem(product.getImagePath());

            // 🔁 Enregistrer nouvelle image
            String imagePath = saveImageToFileSystem(dto.getImageFile());
            product.setImagePath(imagePath);
        }

        Product updated = productRepository.save(product);
        return productMapper.toDto(updated);
    }



    @Override
    public ProductResponseDTO getProductById(UUID productId) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return productMapper.toDto(product);
    }

    @Override
    public void deleteProduct(UUID productId) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        // ✅ Supprimer l’image du disque si elle existe
        deleteImageFromFileSystem(product.getImagePath());

        productRepository.delete(product);
    }


    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productMapper.toDtoList(productRepository.findAll());
    }

    @Override
    public Page<ProductResponseDTO> getProductsPage(Pageable pageable) {
        return productRepository.findAll(pageable).map(productMapper::toDto);
    }

    private String saveImageToFileSystem(MultipartFile imageFile) {
        try {
            String originalFilename = imageFile.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : "";

            String filename = UUID.randomUUID() + extension;

            // ✅ Chemin absolu : racine projet + uploadDir
            Path rootPath = Paths.get(System.getProperty("user.dir")).resolve(uploadDir);

            // ✅ Créer dossier s'il n'existe pas
            if (!Files.exists(rootPath)) {
                Files.createDirectories(rootPath);
            }

            // ✅ Fichier final
            Path filePath = rootPath.resolve(filename);
            imageFile.transferTo(filePath.toFile());

            // ✅ Retourner le chemin relatif pour DB
            return uploadDir + "/" + filename;

        } catch (IOException e) {
            throw new RuntimeException("Failed to store image: " + e.getMessage(), e);
        }
    }



    private void deleteImageFromFileSystem(String imagePath) {
        if (imagePath == null || imagePath.isEmpty()) return;

        Path filePath = Paths.get(System.getProperty("user.dir")).resolve(imagePath);
        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("⚠️ Failed to delete image: " + e.getMessage());
        }
    }


}
