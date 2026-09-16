import { apiRequest } from './api'

export const getAdminStats = (token) =>
  apiRequest('/admin/stats', { method: 'GET', token })

export const getAdminUsers = (token) =>
  apiRequest('/admin/users', { method: 'GET', token })

export const updateUserRole = (id, role, token) =>
  apiRequest(`/admin/users/${id}/role`, { method: 'PATCH', body: { role }, token })

export const toggleUserStatus = (id, isActive, token) =>
  apiRequest(`/admin/users/${id}/status`, { method: 'PATCH', body: { isActive }, token })

export const registerAdminAccount = (adminData, token) =>
  apiRequest('/auth/register-admin', { method: 'POST', body: adminData, token })
