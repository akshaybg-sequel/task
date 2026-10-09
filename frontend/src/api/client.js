// Empty by default, so URLs stay relative and go through the Vite proxy (dev) or nginx (prod).
// Set VITE_API_BASE_URL in a .env file only if the backend lives somewhere else.
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

// Every backend endpoint lives under this prefix (see @RequestMapping in the controllers).
const API_PREFIX = '/api/v1'


// The backend answered, but with an error status (400, 404, 500...).
export class ApiError extends Error {
  constructor(status, body) {
    // GlobalExceptionHandler sends { status, message }.
    // Spring's own errors (e.g. a missing query param) send { status, error, path } instead.
    super(body?.message || body?.error || `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}


// The request never reached any server (dev server stopped, no network).
export class NetworkError extends Error {
  constructor(cause) {
    super('Could not reach the server. Is the backend running?')
    this.name = 'NetworkError'
    this.cause = cause
  }
}


// Builds "/api/v1/tasks/search?title=spring&page=0&size=10", skipping empty values.
function buildUrl(path, params) {
  const url = API_BASE + API_PREFIX + path
  if (!params) {
    return url
  }

  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value)
    }
  }

  const queryString = query.toString()
  return queryString ? `${url}?${queryString}` : url
}


// Sends one request and returns the parsed JSON body (or null for 204 No Content).
export async function request(path, { method = 'GET', body, params } = {}) {
  let response
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : {},
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    // fetch only throws when there was no response at all.
    throw new NetworkError(err)
  }

  // DELETE returns 204 with an empty body; reading JSON from it would crash.
  if (response.status === 204) {
    return null
  }

  // Read as text first, so an empty or non-JSON body doesn't crash JSON parsing.
  const text = await response.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  // fetch does NOT throw on 400/404/500, so check ourselves.
  if (!response.ok) {
    throw new ApiError(response.status, data)
  }

  return data
}
