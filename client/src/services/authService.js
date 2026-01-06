/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiPost, apiGet } from './api';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (email, password) => {
  return await apiPost('/auth/login', { email, password });
};

/**
 * Register user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export const register = async (name, email, password) => {
  return await apiPost('/auth/register', { name, email, password });
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  return await apiGet('/auth/me');
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  return await apiPost('/auth/logout', {});
};

