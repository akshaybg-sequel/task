package com.example.teamtask.service;

import com.example.teamtask.exception.TaskNotFoundException;
import com.example.teamtask.model.Task;
import com.example.teamtask.repository.TaskRepository;
import com.example.teamtask.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.teamtask.dto.TaskResponse;
import com.example.teamtask.dto.TaskRequest;
import com.example.teamtask.model.User;
import java.util.List;
import com.example.teamtask.exception.UserNotFoundException;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskResponse> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream()
                .map(task -> new TaskResponse(task.getId(), task.getTitle(), task.isCompleted(), task.getUser().getId()))
                .toList();
    }

    public TaskResponse createTask(TaskRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));
        
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setCompleted(request.isCompleted());
        task.setUser(user); 
        Task savedTask = taskRepository.save(task);
        return new TaskResponse(savedTask.getId(), savedTask.getTitle(), savedTask.isCompleted(), user.getId());
    }

    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        return new TaskResponse(task.getId(), task.getTitle(), task.isCompleted(), task.getUser().getId());
    }
    
    public TaskResponse updateTask(Long id, TaskRequest updatedTask) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setCompleted(updatedTask.isCompleted());

        Task savedTask = taskRepository.save(existingTask);
        return new TaskResponse(savedTask.getId(), savedTask.getTitle(), savedTask.isCompleted(), savedTask.getUser().getId());
    }

    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }

        taskRepository.deleteById(id);
    }

    public Page<TaskResponse> getTaskByUser(Long userId, Pageable pageable) {
        return taskRepository.findByUserId(userId, pageable)
                .map(this::toResponse);
    }

    public Page<TaskResponse> getTaskByCompleted(boolean completed, Pageable pageable) {
        return taskRepository.findByCompleted(completed, pageable)
                .map(this::toResponse);
    }

    public Page<TaskResponse> searchTaskByTitle(String title, Pageable pageable) {
        return taskRepository.findByTitleContainingIgnoreCase(title, pageable)
                .map(this::toResponse);
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(task.getId(), task.getTitle(), task.isCompleted(), task.getUser().getId());
    }
}
