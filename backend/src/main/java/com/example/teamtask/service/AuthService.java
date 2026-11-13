package com.example.teamtask.service;

import com.example.teamtask.dto.RegisterRequest;
import com.example.teamtask.dto.UserResponse;
import com.example.teamtask.exception.UsernameAlreadyExistsException;
import com.example.teamtask.model.User;
import com.example.teamtask.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.teamtask.dto.LoginRequest;                      // NEW
import com.example.teamtask.dto.LoginResponse;                     // NEW
import com.example.teamtask.exception.InvalidCredentialsException; // NEW
import com.example.teamtask.security.JwtService;                   // NEW


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {                         // NEW parameter
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;                                   // NEW
    }

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameAlreadyExistsException(request.getUsername());
        }

        User user = new User(request.getName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);
        return new UserResponse(savedUser.getId(), savedUser.getName());
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtService.generateToken(user.getUsername());
        return new LoginResponse(token);
    }

}
