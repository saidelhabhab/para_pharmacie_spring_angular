package com.elhabhab.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfiguration implements WebMvcConfigurer {

    public static final String GET ="GET";
    public static final String PUT = "PUT";
    public static final String DELETE = "DELETE";
    public static final String POST = "POST";
    public static final String OPTIONS = "OPTIONS";
    public static final String PATCH = "PATCH";



    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods(GET,PUT,DELETE,POST,OPTIONS, PATCH)
                .allowedHeaders("*")
                .allowedOriginPatterns("/*")
                .allowedOrigins("http://localhost:4200")
                .allowCredentials(true);

    }
}