// POST /api/v1/users  body: { name }  →  UserResponse
export function createUser(user) {
  return request('/users', { method: 'POST', body: user })
}
