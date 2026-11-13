import { request } from './client'

// GET /api/v1/users  →  UserResponse[]
export function getUsers() {
  return request('/users')
}

// GET /api/v1/users/{id}  →  UserResponse
export function getUser(id) {
  return request(`/users/${id}`)
}

// GET /api/v1/users/search?name=..&page=..&size=..&sort=..  →  Page<UserResponse>
export function searchUsers(name, { page = 0, size = 10, sort } = {}) {
  return request('/users/search', { params: { name, page, size, sort } })
}

// POST /api/v1/users  body: { name }  →  UserResponse
export function createUser(user) {
  return request('/users', { method: 'POST', body: user })
}

// DELETE /api/v1/users/{id}  →  204, returns null
export function deleteUser(id) {
  return request(`/users/${id}`, { method: 'DELETE' })
}
