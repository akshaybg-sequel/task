package com.example.teamtask.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TaskRequest {

    @NotBlank(message = "Title must not be empty")
    @Size(min = 3, max = 100, message = "Title must contain at least 3 characters")
    private String title;

    private boolean completed;

    private Long userId;

    public TaskRequest() {
    }

    public TaskRequest(String title, boolean completed, Long userId) {
        this.title = title;
        this.completed = completed;
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
