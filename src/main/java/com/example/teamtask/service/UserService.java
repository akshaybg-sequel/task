package com.example.teamtask.service;
import org.springframework.stereotype.Service;
import com.example.teamtask.model.User;
import com.example.teamtask.repository.UserRepository;
import com.example.teamtask.dto.UserResponse;
import java.util.List;
import com.example.teamtask.exception.UserNotFoundException;

@Service 
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse createUser(User user) {
        User savedUser = userRepository.save(user);
        return new UserResponse(savedUser.getId(), savedUser.getName());
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserResponse(user.getId(), user.getName()))
                .toList();
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return new UserResponse(user.getId(), user.getName());
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }
}
