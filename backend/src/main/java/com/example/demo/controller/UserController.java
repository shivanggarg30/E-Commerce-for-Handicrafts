package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletRequest request) {
        try {
            // Get IP address from request
            String ipAddress = request.getRemoteAddr();

            Optional<User> authenticatedUser = userService.loginUser(
                    user.getEmail(),
                    user.getPassword(),
                    ipAddress
            );

            if (authenticatedUser.isPresent()) {
                return ResponseEntity.ok("Login Successful");
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            // Log the exception
            System.err.println("Login error: " + e.getMessage());
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testCors() {
        return ResponseEntity.ok("CORS is working properly!");
    }
}