import { apiRequest } from './api';

export const getAddresses = (token) =>
  apiRequest('/addresses', { method: 'GET', token });

export const addAddress = (addressData, token) =>
  apiRequest('/addresses', { method: 'POST', body: addressData, token });

export const updateAddress = (id, addressData, token) =>
  apiRequest(`/addresses/${id}`, { method: 'PATCH', body: addressData, token });

export const deleteAddress = (id, token) =>
  apiRequest(`/addresses/${id}`, { method: 'DELETE', token });

export const setDefaultAddress = (id, token) =>
  apiRequest(`/addresses/${id}/default`, { method: 'PATCH', token });
