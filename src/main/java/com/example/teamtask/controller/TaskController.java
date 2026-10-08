package com.example.teamtask.controller;

import com.example.teamtask.service.TaskService;
import com.example.teamtask.dto.TaskResponse;
import com.example.teamtask.dto.TaskRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController 
@RequestMapping("/tasks") 
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> getTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public TaskResponse createTask(@Valid @RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @GetMapping("/user/{userId}")
    public Page<TaskResponse> getTaskByUser(@PathVariable Long userId, Pageable pageable) {
        return taskService.getTaskByUser(userId, pageable);
    }

    @GetMapping("/completed")
    public Page<TaskResponse> getTaskByCompleted(@RequestParam boolean completed, Pageable pageable) {
        return taskService.getTaskByCompleted(completed, pageable);
    }

    @GetMapping("/search")
    public Page<TaskResponse> searchTaskByTitle(@RequestParam String title, Pageable pageable) {
        return taskService.searchTaskByTitle(title, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest updatedTask) {

        TaskResponse task = taskService.updateTask(id, updatedTask);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
