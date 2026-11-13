import { request } from './client'

// GET /api/v1/tasks  →  TaskResponse[]
export function getTasks() {
  return request('/tasks')
}

// GET /api/v1/tasks/{id}  →  TaskResponse
export function getTask(id) {
  return request(`/tasks/${id}`)
}

// POST /api/v1/tasks  body: { title, completed, userId }  →  TaskResponse
export function createTask(task) {
  return request('/tasks', { method: 'POST', body: task })
}

// PUT /api/v1/tasks/{id}  body: { title, completed, userId }  →  TaskResponse
export function updateTask(id, task) {
  return request(`/tasks/${id}`, { method: 'PUT', body: task })
}

// DELETE /api/v1/tasks/{id}  →  204, returns null
export function deleteTask(id) {
  return request(`/tasks/${id}`, { method: 'DELETE' })
}

// GET /api/v1/tasks/user/{userId}?page=..&size=..&sort=..  →  Page<TaskResponse>
export function getTasksByUser(userId, { page = 0, size = 10, sort } = {}) {
  return request(`/tasks/user/${userId}`, { params: { page, size, sort } })
}

// GET /api/v1/tasks/completed?completed=..&page=..&size=..&sort=..  →  Page<TaskResponse>
export function getTasksByCompleted(completed, { page = 0, size = 10, sort } = {}) {
  return request('/tasks/completed', { params: { completed, page, size, sort } })
}

// GET /api/v1/tasks/search?title=..&page=..&size=..&sort=..  →  Page<TaskResponse>
export function searchTasks(title, { page = 0, size = 10, sort } = {}) {
  return request('/tasks/search', { params: { title, page, size, sort } })
}
