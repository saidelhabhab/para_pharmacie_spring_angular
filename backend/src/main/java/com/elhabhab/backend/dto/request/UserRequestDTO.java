package com.elhabhab.backend.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {

        @Email
        @NotBlank
        private String email;

        @NotBlank
        @Size(max = 50)
        private String firstName;

        @NotBlank
        @Size(max = 50)
        private String lastName;

        @NotBlank
        private String password;

        private String role;

        @NotBlank
        @Pattern(regexp = "^\\+[1-9]\\d{1,14}$")
        private String phone;

        private String address;
        private String profileImgBase64;
        private String aboutMe;
        private String country;

        // Getters and setters

}
