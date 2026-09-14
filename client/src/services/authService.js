import { apiRequest } from './api'

export const loginUser = async (credentials) => {
  return await apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  })
}

export const registerUser = async (userData) => {
  return await apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  })
}

export const logoutUser = async () => {
  return await apiRequest('/auth/logout', {
    method: 'POST',
  })
}

export const logoutAllUser = async (token) => {
  return await apiRequest('/auth/logout-all', {
    method: 'POST',
    token,
  })
}

export const refreshToken = async () => {
  return await apiRequest('/auth/refresh-token', {
    method: 'POST',
  })
}

export const getCurrentUser = async (token) => {
  return await apiRequest('/users/me', {
    method: 'GET',
    token,
  })
}
