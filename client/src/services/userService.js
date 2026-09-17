import { apiRequest } from './api';

export const updateProfile = (profileData, token) =>
  apiRequest('/users/me', { method: 'PATCH', body: profileData, token });

export const changePassword = (passwordData, token) =>
  apiRequest('/auth/change-password', { method: 'PATCH', body: passwordData, token });
