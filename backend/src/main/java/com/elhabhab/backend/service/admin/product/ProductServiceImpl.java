package com.elhabhab.backend.service.admin.product;

import com.elhabhab.backend.dto.request.ProductRequestDTO;
import com.elhabhab.backend.dto.response.ProductResponseDTO;
import com.elhabhab.backend.entity.Notification;
import com.elhabhab.backend.entity.Product;
import com.elhabhab.backend.entity.ProductPhoto;
import com.elhabhab.backend.entity.User;
import com.elhabhab.backend.mapper.ProductMapper;
import com.elhabhab.backend.repository.NotificationRepository;
import com.elhabhab.backend.repository.ProductRepository;
import com.elhabhab.backend.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

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

        // add photos
        if (dto.getPhotoFiles() != null && !dto.getPhotoFiles().isEmpty()) {
            for (MultipartFile photoFile : dto.getPhotoFiles()) {
                String photoPath = saveImageToFileSystem(photoFile);
                product.getPhotos().add(ProductPhoto.builder()
                        .imagePath(photoPath)
                        .product(product)
                        .build());
            }
        }

        Product saved = productRepository.save(product);

        // ✅ Notify all users
        notifyAllUsersAboutNewProduct(saved);
        // ✅ Notify all users  by email
        notifyEmailAllUsersAboutNewProduct(saved);

        return productMapper.toDto(saved);
    }

    @Override
    public ProductResponseDTO updateProduct(UUID productId, ProductRequestDTO dto) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        productMapper.updateProductFromDto(dto, product);

        // 🖼️ Mise à jour de l'image principale
        if (dto.getImageFile() != null && !dto.getImageFile().isEmpty()) {
            deleteImageFromFileSystem(product.getImagePath());
            String imagePath = saveImageToFileSystem(dto.getImageFile());
            product.setImagePath(imagePath);
        }

        // 🗑️ Supprimer les anciennes images de la galerie (fichiers et entités)
        if (dto.getRemovedGalleryImages() != null && !dto.getRemovedGalleryImages().isEmpty()) {
            // Supprimer les fichiers du disque
            for (String rawPath : dto.getRemovedGalleryImages()) {
                String cleanedPath = rawPath.replaceAll("^\"|\"$", ""); // Supprime les guillemets s'il y en a
                deleteImageFromFileSystem(cleanedPath);
            }

            // Supprimer les objets de la liste en base
            product.getPhotos().removeIf(photo ->
                    dto.getRemovedGalleryImages().contains(photo.getImagePath())
            );
        }

        // 📷 Ajouter les nouvelles images galerie (si envoyées)
        if (dto.getPhotoFiles() != null && !dto.getPhotoFiles().isEmpty()) {
            for (MultipartFile photoFile : dto.getPhotoFiles()) {
                String photoPath = saveImageToFileSystem(photoFile);
                product.getPhotos().add(ProductPhoto.builder()
                        .imagePath(photoPath)
                        .product(product)
                        .build());
            }
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

    private void notifyAllUsersAboutNewProduct(Product product) {
        List<User> users = userRepository.findAll();

        String message = "🆕 Un nouveau produit vient d’être ajouté à notre boutique : \"" + product.getName() + "\".\n" +
                "💡 Description : " + product.getDescription() + "\n" +
                "💰 Prix : " + product.getPrice() + " DH" +
                (product.getOldPrice() != null ? " (Ancien prix : " + product.getOldPrice() + " DH)" : "") + "\n" +
                "🔖 Remise : " + (product.getDiscount() != null ? product.getDiscount() + " DH" : "Aucune") + "\n" +
                "🏷️ Catégorie : " + product.getCategory() + "\n" +
                "✅ En stock : " + (product.isInStock() ? "Oui" : "Non") + "\n" +
                "📦 Quantité disponible : " + product.getQuantity() + "\n" +
                "🛍️ Rendez-vous vite sur la boutique pour en profiter !";

        for (User user : users) {
            Notification notification = new Notification();
            notification.setNotificationId(UUID.randomUUID());
            notification.setDescription(message);
            notification.setCreatedDateTime(LocalDateTime.now());
            notification.setRead(false);
            notification.setUser(user);
            notificationRepository.save(notification);
        }
    }

    private void notifyEmailAllUsersAboutNewProduct(Product product) {
        List<User> users = userRepository.findAll();

        String subject = "🆕 Nouveau produit disponible sur ParaPharmacie";
        String productUrl = "https://yourdomain.com/products/" + product.getProductId(); // 🔁 adapte le lien
        String imageUrl = "https://yourdomain.com/" + product.getImagePath(); // 🔁 adapte à ton URL

        String content = """
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #27ae60;">Nouveau produit : %s</h2>
                <img src="%s" alt="Produit" style="width: 100%%; max-height: 250px; object-fit: cover; border-radius: 8px;" />
                <p><strong>Description :</strong> %s</p>
                <p><strong>Prix :</strong> %.2f DH %s</p>
                <p><strong>Remise :</strong> %s</p>
                <p><strong>Catégorie :</strong> %s</p>
                <div style="margin-top: 20px; text-align: center;">
                    <a href="%s" style="background-color: #27ae60; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">
                        🔎 Voir le produit
                    </a>
                </div>
                <p style="margin-top: 30px; font-size: 12px; color: #999;">Merci de faire confiance à ParaPharmacie 💚</p>
            </div>
        </body>
        </html>
    """.formatted(
                product.getName(),
                imageUrl,
                product.getDescription(),
                product.getPrice(),
                product.getOldPrice() != null ? "(ancien : " + product.getOldPrice() + " DH)" : "",
                product.getDiscount() != null ? product.getDiscount() + " DH" : "Aucune",
                product.getCategory().toString(),
                productUrl
        );

        for (User user : users) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setTo(user.getEmail());
                helper.setSubject(subject);
                helper.setText(content, true);

                mailSender.send(message);
            } catch (Exception e) {
                System.err.println("❌ Échec envoi email à " + user.getEmail() + " : " + e.getMessage());
            }
        }
    }

}
