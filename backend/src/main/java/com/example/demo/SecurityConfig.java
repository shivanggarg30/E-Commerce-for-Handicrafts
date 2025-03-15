package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS
                .cors(cors -> {})

                // Disable CSRF for API requests
                .csrf(csrf -> csrf.disable())

                // Configure authorization
                .authorizeHttpRequests(auth -> auth
                        // Allow everyone to access auth endpoints
                        .requestMatchers("/api/auth/**").permitAll()

                        // Require authentication for all other endpoints
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}