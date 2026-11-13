import { request } from './client'

// POST /api/v1/auth/login  body: { username, password }  →  { token }
export function login(username, password) {
  return request('/auth/login', { method: 'POST', body: { username, password } })
}

// POST /api/v1/auth/register  body: { name, username, password }  →  UserResponse { id, name }
export function register(name, username, password) {
  return request('/auth/register', { method: 'POST', body: { name, username, password } })
}
