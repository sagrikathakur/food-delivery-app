const API_BASE = '/api'

export const apiRequest = async (endpoint, { method = 'GET', body, headers = {}, token } = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // include cookies for HttpOnly refreshToken
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data.message || 'An error occurred')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}
