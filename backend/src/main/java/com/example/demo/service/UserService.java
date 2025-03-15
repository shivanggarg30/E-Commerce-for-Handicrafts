package com.example.demo.service;

import com.example.demo.model.LoginAttempt;
import com.example.demo.model.User;
import com.example.demo.repository.LoginAttemptRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final LoginAttemptRepository loginAttemptRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       LoginAttemptRepository loginAttemptRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.loginAttemptRepository = loginAttemptRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password, String ipAddress) {
        // Create login attempt record
        LoginAttempt attempt = new LoginAttempt();
        attempt.setEmail(email);
        attempt.setAttemptTime(LocalDateTime.now());
        attempt.setIpAddress(ipAddress);

        // Check if user exists
        Optional<User> user = userRepository.findByEmail(email);
        boolean success = false;

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            success = true;
        }

        // Record success/failure
        attempt.setSuccessful(success);
        loginAttemptRepository.save(attempt);

        return success ? user : Optional.empty();
    }
}
